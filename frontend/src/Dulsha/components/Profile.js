import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profilepage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            try {
                const { data } = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }//sdasd
        };
        fetchUser();
    }, []);
  return (
    <div>
            {user && (
                <div>
                    <h2>Welcome, {user.firstName}</h2>
                    <p>Email: {user.email}</p>
                    <img class="rounded w-36 h-36" src={`http://localhost:5000/images/${user.filepath}`} alt="Extra large avatar"></img>
                    {/* Add form fields to update user details */}
                </div>
            )}
        </div>
  )
}
