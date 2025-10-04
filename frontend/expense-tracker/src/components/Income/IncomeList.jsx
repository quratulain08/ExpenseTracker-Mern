import React, { useState } from 'react'
import { LuDownload, LuTrash2, LuUtensils } from 'react-icons/lu'
import { IoMdDocument } from 'react-icons/io'
import moment from 'moment'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const IncomeList = ({ incomes, onIncomeDeleted }) => {
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const handleDeleteIncome = async (incomeId, incomeSource) => {
    if (!window.confirm(`Are you sure you want to delete the income from "${incomeSource}"?`)) {
      return
    }

    setDeleteLoading(incomeId)
    
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId))
      
      // Call the callback to refresh the income list
      onIncomeDeleted?.(incomeId)
      
    } catch (error) {
      console.error('Error deleting income:', error)
      alert(error.response?.data?.message || 'Failed to delete income. Please try again.')
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDownloadExcel = async () => {
    setDownloadLoading(true)
    
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob' // Important for file downloads
      })
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      
      // Create filename with current date
      const fileName = `incomes_${moment().format('YYYY-MM-DD')}.xlsx`
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
    return "bg-green-100 text-green-600" // Income is always green
  }

  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h5 className='text-xl font-semibold text-gray-800'>All Income Records</h5>
          <p className='text-sm text-gray-500 mt-1'>
            {incomes?.length || 0} income record{incomes?.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {incomes?.length > 0 && (
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
        {incomes?.length > 0 ? (
          incomes.map((income) => (
            <div
              key={income._id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {typeof income.icon === "string" && income.icon ? (
                  <img 
                    src={income.icon} 
                    alt={income.source} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                ) : (
                  <LuUtensils />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-between">
                <div className="flex-1">
                  <h6 className="text-sm font-medium text-gray-700">{income.source}</h6>
                  <p className="text-xs text-gray-500 mt-1">
                    {moment(income.date).format('DD MMM, YYYY')}
                  </p>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountColor()}`}>
                    <h6 className="text-xs font-medium">
                      + ${income.amount}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteIncome(income._id, income.source)}
                disabled={deleteLoading === income._id}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50 p-1"
                title="Delete income"
              >
                {deleteLoading === income._id ? (
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
            <p className='text-sm'>No income records found</p>
            <p className='text-xs mt-1'>Start by adding your first income!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomeList