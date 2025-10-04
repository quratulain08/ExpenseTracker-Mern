import React from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { useEffect,useState } from 'react';
const Last30DaysExpenses = ({data}) => {

   const [chartData,setChartData]=useState([])
      

   useEffect(() => {
    console.log('Last30DaysExpenses received data:', data);
    if (data && data.length > 0) {
      const result = prepareExpenseBarChartData(data);
      setChartData(result);
    } else {
      console.log('No data received or empty array');
    }

    return () => {};
    }, [data]);




  return (
    <div className='card col-span-1'>
    <div className='flex items-center justify-between mb-4'>
      <h5 className='text-lg'>Last 30 Days Expenses</h5>
    </div>
    
    {chartData && chartData.length > 0 ? (
      <CustomBarChart data={chartData} />
    ) : (
      <div className='flex flex-col items-center justify-center py-8 text-gray-500'>
        <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
          <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
        </div>
        <p className='text-sm text-center'>No expense data for the last 30 days</p>
      </div>
    )}

    </div>
  )
}

export default Last30DaysExpenses