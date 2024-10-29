import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  // State to manage edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Roger Curtis',
    gender: 'Male',
    dob : '10/07/2024',
    bloodType: 'O+ (Positive)',
    allergies: 'Milk, Penicillin',
    diseases: 'Diabetes, Blood Disorders',
    height: '1.76m',
    weight: '65kg',
    lastVisit: '25th October 2019',
    email: 'roger.curtis@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Springfield, IL 62704, USA',
    profilePic: assets.profile_pic, // Initial profile picture
  });

  // Toggle edit mode
  const handleEditClick = () => setIsEditing(!isEditing);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: reader.result, // Base64 encoded image for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save information (you can add additional logic to persist data)
  const handleSaveClick = () => {
    setIsEditing(false);
    // Logic to save data (API calls or local storage)
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      {/* Main Content */}
      <main className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">MY PROFILE</h1>

        {/* Patient Details */}
        <section className="grid grid-cols-1 gap-6">
          <div className="col-span-1 p-6">
            {isEditing ? (
              <div className="text-center">
                <label htmlFor="profilePic" className="cursor-pointer">
                  <img
                    className="h-24 w-24 rounded-full mx-auto"
                    src={profileData.profilePic}
                    alt="Profile"
                  />
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-2">Change Profile Picture</p>
                </label>
              </div>
            ) : (
              <img
                className="h-24 w-24 rounded-full mx-auto"
                src={profileData.profilePic}
                alt="Profile"
              />
            )}

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="block w-full text-center text-xl font-semibold mt-4 border-b-2 border-gray-300 focus:outline-none focus:border-green-600"
              />
            ) : (
              <h3 className="text-center text-xl font-semibold mt-4">{profileData.name}</h3>
            )}
            
            <div className="mt-6">
              <h4 className="font-semibold">Information:</h4>
              <ul className="mt-2 space-y-2 text-gray-600">
                {isEditing ? (
                  <>
                    <li>
                      Gender: 
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                        className="ml-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </li>
                    <li>Date of Birth: 
                       <input type='date'name='dob' onChange={handleChange} value={profileData.dob}></input>
                    </li>
                    <li>Blood Type: 
                      <input type="text" name="bloodType" value={profileData.bloodType} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                    </li>
                    <li>Allergies: 
                      <input type="text" name="allergies" value={profileData.allergies} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                    </li>
                    <li>Diseases: 
                      <input type="text" name="diseases" value={profileData.diseases} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2" />
                    </li>
                    <li>Height: 
                      <input type="text" name="height" value={profileData.height} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                    </li>
                    <li>Weight: 
                      <input type="text" name="weight" value={profileData.weight} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                    </li>
                    <li>Last Visit: 
                      <input type="text" name="lastVisit" value={profileData.lastVisit} onChange={handleChange} 
                        className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                    </li>
                  </>
                ) : (
                  <>
                    <li>Gender: {profileData.gender}</li>
                    <li>Date of Birthday: {profileData.dob}</li>
                    <li>Blood Type: {profileData.bloodType}</li>
                    <li>Allergies: {profileData.allergies}</li>
                    <li>Diseases: {profileData.diseases}</li>
                    <li>Height: {profileData.height}</li>
                    <li>Weight: {profileData.weight}</li>
                    <li>Last Visit: {profileData.lastVisit}</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="grid grid-cols-1 gap-6 mt-8">
          <div className="col-span-1">
            <h4 className="font-semibold">Contact Information:</h4>
            <ul className="mt-4 space-y-2 text-gray-600">
              {isEditing ? (
                <>
                  <li>Email: 
                    <input type="text" name="email" value={profileData.email} onChange={handleChange} 
                      className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                  </li>
                  <li>Phone: 
                    <input type="text" name="phone" value={profileData.phone} onChange={handleChange} 
                      className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                  </li>
                  <li>Address: 
                    <input type="text" name="address" value={profileData.address} onChange={handleChange} 
                      className="border-b-2 border-gray-300 focus:outline-none focus:border-green-600 ml-2"/>
                  </li>
                </>
              ) : (
                <>
                  <li>Email: {profileData.email}</li>
                  <li>Phone: {profileData.phone}</li>
                  <li>Address: {profileData.address}</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <button className="bg-green-600 text-white py-2 px-6 rounded mx-2" onClick={handleSaveClick}>Save Information</button>
          ) : (
            <button className="bg-blue-600 text-white py-2 px-6 rounded mx-2" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyProfile;
