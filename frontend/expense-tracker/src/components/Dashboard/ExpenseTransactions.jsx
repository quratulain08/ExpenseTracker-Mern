import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { IoMdDocument } from 'react-icons/io'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment' // Make sure to import moment

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className='card h-fit lg:col-span-2'>
      <div className='flex items-center justify-between mb-6'>
        <h5 className='text-xl font-semibold text-gray-800'>Expenses</h5>
        <button
          className='card-btn hover:scale-105 transition-transform'
          onClick={onSeeMore}
        >
          See More <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='space-y-3'>
        {transactions?.length > 0 ? (
          transactions.slice(0, 4).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category}
              icon={item.icon}
              date={moment(item.date).format('DD MMM, YYYY')}
              amount={item.amount}
              type='expense'
              hideDeleteBtn
            />
          ))
        ) : (
          <div className='text-center py-8 text-gray-500'>
            <IoMdDocument className='mx-auto text-4xl mb-3 opacity-50' />
            <p className='text-sm'>No expense transactions</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseTransactions
