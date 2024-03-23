import React, { useState, useEffect } from 'react';
import Sidebar from '../Dulsha/components/Sidebar'
function FeddbackDetails() {
    const [contactDetails, setContactDetails] = useState([]);

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/contactus/get');
                const data = await response.json();
                setContactDetails(data);
            } catch (error) {
                console.error('Error fetching contact details:', error);
            }
        };

        fetchContactDetails();
    }, []);

    return (
        <div>
             <div class="p-4 sm:ml-64">
        <h1 class="text-xl font-bold leading-tight tracking-tight white-gray-900 md:text-2xl white:text-dark">
        Feedback Details
              </h1>
             <Sidebar/>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subscribe
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactDetails.map(contact => (
                            <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.firstName}
                                </td>
                                <td className="px-6 py-4">
                                    {contact.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {contact.email}
                                </td>
                                <td className="px-6 py-4">
                                    {contact.subject}
                                </td>
                                <td className="px-6 py-4">
                                    {contact.message}
                                </td>
                                <td className="px-6 py-4">
                                    {contact.subscribe ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(contact.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}

export default FeddbackDetails;
