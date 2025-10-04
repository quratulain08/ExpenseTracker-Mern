import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

import moment from 'moment'
const RecentTransactions = ({ transactions, onSeeMore }) => {
  console.log('Recent transactions data:', transactions);
  return (
    <div className='card h-fit'>
        <div className='flex items-center justify-between mb-6'>
            <h5 className='text-xl font-semibold text-gray-800'>Recent Transactions</h5>

            <button className='card-btn hover:scale-105 transition-transform' onClick={onSeeMore}>
                See More  <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='space-y-3'>
            {transactions?.length > 0 ? (
                transactions.slice(0,6).map((item)=>(
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type === "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM, YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))
            ) : (
                <div className='text-center py-8 text-gray-500'>
                    <IoMdDocument className='mx-auto text-4xl mb-3 opacity-50' />
                    <p className='text-sm'>No recent transactions</p>
                </div>
            )}
        </div>


    </div>
  )
}

export default RecentTransactions