import React, { useMemo } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, // Required for Doughnut Chart
    Tooltip, // Typo 'Tooltip,q' fixed here
    Legend,
    CategoryScale, // Required for Bar Chart
    LinearScale,   // Required for Bar Chart
    BarElement,    // Required for Bar Chart
    Title,         // Required for Bar Chart
} from 'chart.js';

// Register ALL necessary components for both charts
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

// --- MOCK USER DATA (Consolidated from UserData.jsx) ---
const ALL_USERS_DATA = [
    {
        "User_ID": 1,
        "Join_Date": "2024-05-10",
        "Country": "USA",
        "Device_Type": "Mobile",
        "Age": 32,
        "Total_Orders": 4,
        "Total_Spent ($)": 245.5,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 7,
        "Active_Status": "Active"
    },
    {
        "User_ID": 2,
        "Join_Date": "2024-03-22",
        "Country": "Canada",
        "Device_Type": "Desktop",
        "Age": 45,
        "Total_Orders": 1,
        "Total_Spent ($)": 55.99,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 30,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 3,
        "Join_Date": "2023-11-01",
        "Country": "UK",
        "Device_Type": "Tablet",
        "Age": 28,
        "Total_Orders": 8,
        "Total_Spent ($)": 499.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 3,
        "Active_Status": "Active"
    },
    {
        "User_ID": 4,
        "Join_Date": "2024-08-15",
        "Country": "USA",
        "Device_Type": "Mobile",
        "Age": 19,
        "Total_Orders": 0,
        "Total_Spent ($)": 0.0,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 60,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 5,
        "Join_Date": "2023-01-20",
        "Country": "Germany",
        "Device_Type": "Desktop",
        "Age": 58,
        "Total_Orders": 12,
        "Total_Spent ($)": 1120.3,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 1,
        "Active_Status": "Active"
    },
    {
        "User_ID": 6,
        "Join_Date": "2024-06-01",
        "Country": "France",
        "Device_Type": "Mobile",
        "Age": 22,
        "Total_Orders": 2,
        "Total_Spent ($)": 89.99,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 15,
        "Active_Status": "Active"
    },
    {
        "User_ID": 7,
        "Join_Date": "2023-04-18",
        "Country": "Australia",
        "Device_Type": "Tablet",
        "Age": 37,
        "Total_Orders": 5,
        "Total_Spent ($)": 350.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 25,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 8,
        "Join_Date": "2024-01-05",
        "Country": "Japan",
        "Device_Type": "Desktop",
        "Age": 41,
        "Total_Orders": 10,
        "Total_Spent ($)": 750.5,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 2,
        "Active_Status": "Active"
    },
    {
        "User_ID": 9,
        "Join_Date": "2024-07-29",
        "Country": "USA",
        "Device_Type": "Mobile",
        "Age": 25,
        "Total_Orders": 1,
        "Total_Spent ($)": 29.99,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 40,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 10,
        "Join_Date": "2023-09-12",
        "Country": "Brazil",
        "Device_Type": "Desktop",
        "Age": 50,
        "Total_Orders": 7,
        "Total_Spent ($)": 600.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 6,
        "Active_Status": "Active"
    },
    {
        "User_ID": 11,
        "Join_Date": "2024-02-14",
        "Country": "India",
        "Device_Type": "Mobile",
        "Age": 29,
        "Total_Orders": 3,
        "Total_Spent ($)": 150.0,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 10,
        "Active_Status": "Active"
    },
    {
        "User_ID": 12,
        "Join_Date": "2023-06-25",
        "Country": "Canada",
        "Device_Type": "Tablet",
        "Age": 33,
        "Total_Orders": 6,
        "Total_Spent ($)": 400.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 55,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 13,
        "Join_Date": "2024-04-03",
        "Country": "UK",
        "Device_Type": "Desktop",
        "Age": 48,
        "Total_Orders": 9,
        "Total_Spent ($)": 910.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 4,
        "Active_Status": "Active"
    },
    {
        "User_ID": 14,
        "Join_Date": "2024-08-01",
        "Country": "Germany",
        "Device_Type": "Mobile",
        "Age": 21,
        "Total_Orders": 0,
        "Total_Spent ($)": 0.0,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 90,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 15,
        "Join_Date": "2023-03-10",
        "Country": "France",
        "Device_Type": "Desktop",
        "Age": 62,
        "Total_Orders": 15,
        "Total_Spent ($)": 1500.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 1,
        "Active_Status": "Active"
    },
    {
        "User_ID": 16,
        "Join_Date": "2024-05-20",
        "Country": "Australia",
        "Device_Type": "Mobile",
        "Age": 27,
        "Total_Orders": 2,
        "Total_Spent ($)": 120.0,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 8,
        "Active_Status": "Active"
    },
    {
        "User_ID": 17,
        "Join_Date": "2023-10-01",
        "Country": "Japan",
        "Device_Type": "Tablet",
        "Age": 35,
        "Total_Orders": 4,
        "Total_Spent ($)": 280.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 32,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 18,
        "Join_Date": "2024-01-15",
        "Country": "USA",
        "Device_Type": "Desktop",
        "Age": 49,
        "Total_Orders": 11,
        "Total_Spent ($)": 850.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 3,
        "Active_Status": "Active"
    },
    {
        "User_ID": 19,
        "Join_Date": "2024-07-07",
        "Country": "Brazil",
        "Device_Type": "Mobile",
        "Age": 23,
        "Total_Orders": 1,
        "Total_Spent ($)": 35.0,
        "Is_Subscribed": false,
        "Last_Login_Days_Ago": 45,
        "Active_Status": "Inactive"
    },
    {
        "User_ID": 20,
        "Join_Date": "2023-08-20",
        "Country": "India",
        "Device_Type": "Desktop",
        "Age": 55,
        "Total_Orders": 8,
        "Total_Spent ($)": 700.0,
        "Is_Subscribed": true,
        "Last_Login_Days_Ago": 5,
        "Active_Status": "Active"
    }
];

// --- 1. Data Calculation Logic ---
const calculateDashboardMetrics = (data) => {
    const statusCounts = { Active: 0, Inactive: 0 };
    const countryOrderCounts = {};

    data.forEach(user => {
        // Count Active/Inactive Status
        if (user.Active_Status === 'Active') {
            statusCounts.Active += 1;
        } else {
            statusCounts.Inactive += 1;
        }
        // Aggregate Orders by Country (top 5 for Bar Chart)
        countryOrderCounts[user.Country] = (countryOrderCounts[user.Country] || 0) + user.Total_Orders;
    });

    // Sort countries by total orders and take the top 5
    const sortedCountries = Object.entries(countryOrderCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return {
        statusCounts,
        topCountries: sortedCountries.map(([country]) => country),
        topOrders: sortedCountries.map(([, orders]) => orders),
    };
};

const UserChart = (Dark) => { // Using user's preferred component name
    const fullUserData = ALL_USERS_DATA;

    // Calculate metrics using useMemo to ensure efficiency
    const metrics = useMemo(() => calculateDashboardMetrics(fullUserData), [fullUserData]);

    // --- 2. Doughnut Chart Configuration (Active Status) ---
    const statusDoughnutData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                label: 'User Status Distribution',
                // Now correctly referencing the calculated metrics from the useMemo hook
                data: [metrics.statusCounts.Active, metrics.statusCounts.Inactive],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)', // Green for Active
                    'rgba(239, 68, 68, 0.8)',   // Red for Inactive
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Active vs. Inactive Users',
                font: { size: 16 }
            },
            legend: { position: 'bottom' }
        }
    };

    // --- 3. Bar Chart Configuration (Orders by Country) ---
    const countryBarData = {
        labels: metrics.topCountries,
        datasets: [
            {
                label: 'Total Orders',
                data: metrics.topOrders,
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Top 5 Countries by Total Orders',
                font: { size: 16 }
            },
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Orders'
                }
            }
        }
    };

    // --- 4. Render Layout ---
    return (
        <div className={`p-4 sm:p-8 bg-gray-50 min-h-screen ${Dark ? "bg-gray-400 text-white" : 'bg-gray-50'} `}>
            <div className='w-full flex flex-col items-center justify-center p-4'>
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10 pb-4 border-b-4 border-blue-500">
                    User Data Visualization Dashboard
                </h1>
                {/* Responsive grid for charts */}
                <div className='flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto'>

                    {/* Chart Card 1: Active Status Doughnut Chart */}
                    <div className='p-6 border rounded-xl shadow-xl bg-white w-full lg:w-[500px] h-[400px]'>
                        {/* FIX: Props for data and options added here */}
                        <Doughnut data={statusDoughnutData} options={doughnutOptions} />
                    </div>

                    {/* Chart Card 2: Orders by Country Bar Chart */}
                    <div className='p-6 border rounded-xl shadow-xl bg-white w-full lg:w-[500px] h-[400px]'>
                        <Bar
                            data={countryBarData}
                            options={barOptions}
                        />
                    </div>
                </div>
                {/* Metrics Summary (Restored for completeness) */}
                <div className="mt-8 p-6 bg-blue-100 rounded-xl max-w-6xl mx-auto text-sm text-gray-700 w-full">
                    <h3 className="font-bold text-lg mb-2">Metrics Summary:</h3>
                    <p>Total Users: {fullUserData.length}</p>
                    <p>Active Users: <span className="text-green-600 font-semibold">{metrics.statusCounts.Active}</span></p>
                    <p>Inactive Users: <span className="text-red-600 font-semibold">{metrics.statusCounts.Inactive}</span></p>
                    <p>The Doughnut Chart shows the user status ratio, and the Bar Chart highlights the top geographical markets by orders.</p>
                </div>
            </div>
        </div>
    )
}

export default UserChart;
