import React, { useState } from 'react'
import { LuDownload, LuTrash2, LuUtensils } from 'react-icons/lu'
import { IoMdDocument } from 'react-icons/io'
import moment from 'moment'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const ExpenseList = ({ expenses, onExpenseDeleted }) => {
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const handleDeleteExpense = async (expenseId, expenseCategory) => {
    if (!window.confirm(`Are you sure you want to delete the expense from "${expenseCategory}"?`)) {
      return
    }

    setDeleteLoading(expenseId)
    
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId))
      
      // Call the callback to refresh the expense list
      onExpenseDeleted?.(expenseId)
      
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert(error.response?.data?.message || 'Failed to delete expense. Please try again.')
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDownloadExcel = async () => {
    setDownloadLoading(true)
    
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob'
      })
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      
      // Create filename with current date
      const fileName = `expenses_${moment().format('YYYY-MM-DD')}.xlsx`
      link.setAttribute('download', fileName)
      
      // Append to html link element page
      document.body.appendChild(link)
      
      // Start download
      link.click()
      
      // Clean up and remove the link
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error downloading Excel file:', error)
      alert(error.response?.data?.message || 'Failed to download Excel file. Please try again.')
    } finally {
      setDownloadLoading(false)
    }
  }

  const getAmountColor = () => {
    return "bg-red-100 text-red-600" // Expenses are red
  }

  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h5 className='text-xl font-semibold text-gray-800'>All Expense Records</h5>
          <p className='text-sm text-gray-500 mt-1'>
            {expenses?.length || 0} expense record{expenses?.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {expenses?.length > 0 && (
          <button
            onClick={handleDownloadExcel}
            disabled={downloadLoading}
            className='card-btn hover:scale-105 transition-transform disabled:opacity-50'
          >
            {downloadLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <LuDownload className='text-base' />
                Download Excel
              </>
            )}
          </button>
        )}
      </div>

      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {expenses?.length > 0 ? (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {typeof expense.icon === "string" && expense.icon ? (
                  <img 
                    src={expense.icon} 
                    alt={expense.category} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                ) : (
                  <LuUtensils />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-between">
                <div className="flex-1">
                  <h6 className="text-sm font-medium text-gray-700">{expense.category}</h6>
                  <p className="text-xs text-gray-500 mt-1">
                    {moment(expense.date).format('DD MMM, YYYY')}
                  </p>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountColor()}`}>
                    <h6 className="text-xs font-medium">
                      - ${expense.amount}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteExpense(expense._id, expense.category)}
                disabled={deleteLoading === expense._id}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50 p-1"
                title="Delete expense"
              >
                {deleteLoading === expense._id ? (
                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LuTrash2 size={18} />
                )}
              </button>
            </div>
          ))
        ) : (
          <div className='text-center py-12 text-gray-500'>
            <IoMdDocument className='mx-auto text-4xl mb-3 opacity-50' />
            <p className='text-sm'>No expense records found</p>
            <p className='text-xs mt-1'>Start by adding your first expense!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseList
