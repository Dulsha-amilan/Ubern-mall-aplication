import React, { useState, useEffect } from 'react';
import SideBar from "./Sidebar";
import axios from 'axios';
import ApexCharts from 'apexcharts';


export default function Admin() {
    const [userCount, setUserCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [shopCount, setShopCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get('http://localhost:5000/api/users/count');
                setUserCount(userResponse.data.count);

                const employeeResponse = await axios.get('http://localhost:5000/employees/count');
                setEmployeeCount(employeeResponse.data.count);

                const shopResponse = await axios.get('http://localhost:5000/shop/count');
                setShopCount(shopResponse.data.count);

                const itemResponse = await axios.get('http://localhost:5000/item/count');
                setItemCount(itemResponse.data.count);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            renderPieChart();
        }
    }, [userCount, employeeCount, shopCount, itemCount, isMounted]);

    const renderPieChart = () => {
        if (userCount !== 0 && employeeCount !== 0 && shopCount !== 0 && itemCount !== 0) {
            const options = {
                series: [shopCount, employeeCount, userCount, itemCount],
                colors: ["#9061F9", "#16BDCA", "#1C64F2", '#ffa07a'],
                chart: {
                    height: 420,
                    width: "100%",
                    type: "pie",
                },
                labels: ["Total Shops", "Total Employees", "Total Users", "Total Items"],
                legend: {
                    position: "bottom",
                    fontSize: "14px",
                    color: "#ffffff"
                },
            };

            const chart = new ApexCharts(document.getElementById("pie-chart"), options);
            chart.render();
        }
    };

    return (
        <div>
            <SideBar />
            <div className="p-4 sm:ml-64 flex justify-between">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Users:</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{userCount}</p>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Employees:</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{employeeCount}</p>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Shops:</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{shopCount}</p>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Items:</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{itemCount}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 sm:ml-64 flex justify-between">
                <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 white:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="py-6" id="pie-chart"></div>
                </div>
            </div>
        </div>
    );
}
