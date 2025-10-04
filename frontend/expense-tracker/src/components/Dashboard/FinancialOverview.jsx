import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS = ['#14b8a6', '#f97316', '#a855f7', '#ef4444']

const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
   const  balanceData = [
    {name: 'Total Balance', amount: Math.abs(totalBalance || 0), },
    {name: 'Total Income', amount: totalIncome || 0, },
    {name: 'Total Expenses', amount: totalExpense || 0, },
   ];
 
    return <div className=''>
  <div className='flex items-center justify-between'>
 <h5 className='text-xl font-semibold text-gray-800 mb-6'>Financial Overview</h5>
  </div>
    
<CustomPieChart
 data={balanceData}
 label="Total Balance"
 totalAmount={`$${totalBalance}`}
 colors={COLORS} 
 showTextAnchor
 />

    </div>
  
}

export default FinancialOverview