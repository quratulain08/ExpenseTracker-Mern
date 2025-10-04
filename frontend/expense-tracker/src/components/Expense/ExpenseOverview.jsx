import React ,{useState ,useEffect}from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomLineBarChart from '../Charts/CustomLineBarChart'
import { prepareExpenseBarChartData } from '../../utils/helper'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData,setChartData]=useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);
        return () => {};
    }, [transactions]);
    
    return (
        <div className='card'>
              <div className='flex items-center justify-between mb-4'>
              <div className=''>
              <h5 className='text-lg'>Expense Overview</h5>
              <p className='text-xs text-gray-400 mt-0.5'>
              Track your expenses and monitor your spending patterns with our comprehensive expense overview.
              </p>
              
              </div>

              <button className=' add-btn' onClick={onAddExpense}>
              <LuPlus className='text-lg'/> Add Expense
              </button>

              </div>
              <div className='mt-10'>
                {chartData && chartData.length > 0 ? (
                  <div className='max-w-4xl mx-auto lg:max-w-3xl xl:max-w-4xl'>
                    <CustomLineBarChart data ={chartData}  />
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                    <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-medium text-gray-600 mb-2'>No Expense Data</h3>
                    <p className='text-sm text-gray-500 text-center max-w-sm'>
                      There are no recent expense transactions to display. Start by adding your first expense to see the overview chart.
                    </p>
                  </div>
                )}
              </div>
        
        
        </div>
    )
    
  
}

export default ExpenseOverview;
  
   