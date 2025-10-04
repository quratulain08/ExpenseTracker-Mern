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
    
    <CustomBarChart
      data={chartData}
 />




    </div>
  )
}

export default Last30DaysExpenses