import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Fetch doctor's info
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Generate available slots for the next 7 days
  const getAvailableSlots = () => {
    setDocSlots([]); // Clear current slots
    let today = new Date(); // Get current date

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today); // Get date with index
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(); // Set end time of the day (20:00)
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 0, 0, 0); // End at 8:00 PM

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* --------------Doctor Details---------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-green-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/*----- Booking slots -------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots for the selected day */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots[slotIndex] &&
              docSlots[slotIndex].map((slot, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`text-center py-2 px-4 rounded-full cursor-pointer ${
                    selectedTimeSlot === slot ? 'bg-primary text-white' : 'border border-gray-200'
                  }`}
                >
                  {slot.time}
                </div>
              ))}
          </div>

          {/* Book an appointment button */}
          <button className="mt-6 py-2 px-4 bg-primary text-white rounded-full">Book an appointment</button>
        </div>

        {/*---- Listing Related Doctors -----*/}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointment;
