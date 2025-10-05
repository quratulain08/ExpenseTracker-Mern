import React ,{useState ,useEffect}from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'
const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData,setChartData]=useState([]);


    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
        return () => {};
    }, [transactions]);
    
    return (
        <div className='card'>
              <div className='flex items-center justify-between mb-4'>
              <div className=''>
              <h5 className='text-lg'> Income Overview</h5>
              <p className='text-xs text-gray-400 mt-0.5'>
              Track your income sources and monitor your financial growth with our comprehensive income overview.
              </p>
              
              </div>

              <button className=' add-btn' onClick={onAddIncome}>
              <LuPlus className='text-lg'/> Add Income
              </button>

              </div>
              <div className='mt-10'>
                {chartData && chartData.length > 0 ? (
                  <div className='w-full max-w-5xl mx-auto'>
                    <CustomBarChart data ={chartData}  />
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-medium text-gray-600 mb-2'>No Income Data</h3>
                    <p className='text-sm text-gray-500 text-center max-w-sm'>
                      There are no recent income transactions to display. Start by adding your first income source to see the overview chart.
                    </p>
                  </div>
                )}
              </div>
        
        
        </div>
    )
    
  
}

export default IncomeOverview;
  
   