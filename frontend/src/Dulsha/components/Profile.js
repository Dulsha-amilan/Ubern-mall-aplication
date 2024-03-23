// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UserProfile() {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const config = {
//                     headers: {
//                         'x-auth-token': token
//                     }
//                 };
//                 const response = await axios.get('http://localhost:5000/api/users/profile', config);
//                 setUserData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>User Profile</h1>
//             <p><strong>First Name:</strong> {userData.firstName}</p>
//             <p><strong>Last Name:</strong> {userData.lastName}</p>
//             <p><strong>Email:</strong> {userData.email}</p>
//             {/* Add more fields as needed */}
//         </div>
//     );
// }

// export default UserProfile;
