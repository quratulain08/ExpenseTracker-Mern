import React from 'react'
import { useState ,useEffect} from 'react';
import CustomPieChart from '../Charts/CustomPieChart';


const COLORS = ['#875cf5', '#14b8a6', '#f97316', '#10b981', '#8b5cf6', '#06b6d4'];
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  
    const [chartData, setChartData] = useState([]);
    const prepareChartData = ()=>{
        const dataArray = data.map((item) => ({
            name: item?.source,
            amount: item?.amount ,
        }));
        setChartData(dataArray);
    }
   
    useEffect(() => {
        prepareChartData();
        return () => {};
    }, [data]);




  
    return (
    <div className='card'>
        <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg'>last 60 Days income</h5>
    </div>
    <CustomPieChart
    data={chartData}
    label="Total income"
    totalAmount={`$${totalIncome}`}
    showTextAnchor
    colors={COLORS}
    />
    </div>
  )
}

export default RecentIncomeWithChart