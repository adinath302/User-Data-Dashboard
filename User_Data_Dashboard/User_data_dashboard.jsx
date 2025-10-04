import React, { useEffect, useMemo, useState } from 'react'
import UserData from '../../components/User_Data_Dashboard/UserData.jsx'
import { Dropdown } from 'bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Line } from 'react-chartjs-2';
const User_data_dashboard = () => {

    const fullUserData = UserData;

    const [search, setSearch] = useState('');
    const [opend, setOpenD] = useState(false)
    const [filterStatus, setFilterStatus] = useState('all')
    const [data, setdata] = useState(false)

    const ItemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    // Search Feature 

    const SearchData = useMemo(() => {
        let filtered = fullUserData;  // asign it with filtered

        if (filterStatus === "Active") {
            filtered = filtered.filter((item) => item.Active_Status === 'Active')
        } else if (filterStatus === 'Inactive') {
            filtered = filtered.filter((item) => item.Active_Status === 'Inactive')
        }

        if (search) {
            filtered = filtered.filter((item) =>
                item.Country.toLowerCase().includes(search.toLowerCase())
            )
        }

        setCurrentPage(1); // Reset to the first page when search or filter changes

        return filtered

    }, [filterStatus, search, fullUserData]);

    const totalPages = Math.ceil(SearchData.length / ItemsPerPage);

    const LastItemIndex = currentPage * ItemsPerPage;
    const FirstItemIndex = LastItemIndex - ItemsPerPage;

    const currentItems = SearchData.slice(FirstItemIndex, LastItemIndex);

    // Helper to generate an array for pagination buttons (e.g., [1, 2, 3, ...])
    // const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

    const HandleFilter = (text) => {
        setFilterStatus(text)
        setOpenD(false)
    }

    const goToPage = (page) => {  // function to navigate to a specific page
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    return (
        <div className='p-6 flex flex-col  items-center justify-center'>
            <div className='font-semibold flex items-center justify-center text-2xl mb-4'>Data Dashboard</div>

            <div className='border-1 rounded-full mb-2 px-3 flex items-center justify-center gap-3'>

                <input
                    type="text"
                    placeholder={`Search User ${filterStatus} by Country`}
                    className='p-1 focus:outline-none'
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                />

                <div className='relative'>
                    <button
                        onClick={() => setOpenD(!opend)}
                        className='flex items-center text-black font-semibold hover:bg-blue-600 transition duration-150'
                    >
                        {filterStatus} <IoMdArrowDropdown className='text-xl' />
                    </button>
                    {
                        opend &&
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden'>
                            <div
                                onClick={() => HandleFilter('Active')}
                                className='flex bg-blue-300 p-1  text-sm font-semibold hover:bg-white rounded-md cursor-pointer select-none'>Active Users</div>
                            <div
                                onClick={() => HandleFilter('Inactive')}
                                className='flex bg-blue-300 rounded-md  p-1 text-sm font-semibold hover:bg-white  cursor-pointer select-none'>Inactive Users</div>
                            <div
                                onClick={() => HandleFilter('all')}
                                className='flex bg-blue-300 rounded-md  p-1 text-sm font-semibold hover:bg-white  cursor-pointer select-none'>All Users ({fullUserData.length})</div>
                        </div>
                    }
                </div>

            </div>
            <div className='flex gap-2 items-center justify-center'>
                <div className='py-1 px-1 rounded-md bg-gray-300 cursor-pointer font-semibold text-md-center'
                    onClick={() => goToPage(currentPage - 1)}
                >
                    Prev
                </div>
                <div
                    className='py-1 px-1 rounded-md bg-gray-300 cursor-pointer font-semibold text-md-center'
                    onClick={() => goToPage(currentPage + 1)}
                >
                    Next
                </div>
            </div>
            <div className='border-1 grid-cols-1 items-center justify-between grid gap-3 p-3 w-fit'>
                <div className='flex items-center justify-between gap-3 '>
                    <div className=' shadow-md shadow-gray-700 bg-gray-900 text-white p-1 font-semibold w-[100px] flex justify-center items-center max-w-[100px]'>User Id</div>
                    <div className=' shadow-md shadow-gray-700 bg-gray-900 text-white p-1 font-semibold w-[35px] flex justify-center items-center max-w-[100px]'>Age</div>
                    <div className=' shadow-md shadow-gray-700 bg-gray-900 text-white p-1 font-semibold w-[100px] flex justify-center items-center max-w-[100px]'>Country</div>
                    <div className=' shadow-md shadow-gray-700 bg-gray-900 text-white p-1 font-semibold w-[100px] flex justify-center items-center max-w-[100px]'>Join Date</div>
                    <div className=' shadow-md shadow-gray-700 bg-gray-900 text-white p-1 font-semibold w-[150px] flex justify-center items-center max-w-[150px]'>Active Status</div>
                </div>
                {
                    currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div
                                className='flex items-center justify-between gap-3'
                                key={item.User_ID}
                            >
                                <div className='border shadow-md shadow-gray-600 p-1 font-semibold flex items-center justify-center w-[100px]'>{item.User_ID}</div>
                                <div className='border shadow-md shadow-gray-600 p-1 font-semibold w-[30px] max-w-[30px]'>{item.Age}</div>
                                <div className='border shadow-md shadow-gray-600 p-1 font-semibold flex items-center justify-center w-[100px] '>{item.Country}</div>
                                <div className='border shadow-md shadow-gray-600 p-1 font-semibold flex items-center justify-center w-[100px]'>{item.Join_Date}</div>
                                <div className='border shadow-md shadow-gray-600 p-1 font-semibold flex items-center justify-center w-[150px]'>{item.Active_Status}</div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center text-red-500 font-bold p-8 bg-yellow-50 rounded-lg'>
                            No items found matching the current search and filter criteria.
                        </div>
                    )}
            </div>
        </div>
    )
}

export default User_data_dashboard;