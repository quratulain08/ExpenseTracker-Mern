import React, { useState } from 'react'
import { LuDollarSign, LuCalendar, LuTag, LuImage, LuUtensils, LuUpload } from 'react-icons/lu'
import Input from '../Inputs/Input'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const AddExpenseForm = ({ onSuccess, onCancel }) => {
  console.log('AddExpenseForm props:', { onSuccess: !!onSuccess, onCancel: !!onCancel });
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    icon: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = React.useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleIconUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          icon: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeIcon = () => {
    setFormData(prev => ({
      ...prev,
      icon: ''
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    if (!formData.category.trim()) {
      setError('Please enter expense category')
      return false
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount')
      return false
    }
    if (!formData.date) {
      setError('Please select a date')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const submitData = {
        category: formData.category.trim(),
        amount: parseFloat(formData.amount),
        date: formData.date,
        ...(formData.icon && { icon: formData.icon })
      }

      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, submitData)
      
      if (response.status === 201) {
        setFormData({
          category: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          icon: ''
        })
        
        onSuccess?.(response.data)
      }
    } catch (error) {
      console.error('Error adding expense:', error)
      setError(
        error.response?.data?.message || 
        'Failed to add expense. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Icon Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <LuImage className="inline mr-2" />
          Expense Icon (Optional)
        </label>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleIconUpload}
          />
          
          {!formData.icon ? (
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full relative">
              <LuUtensils className="text-2xl text-orange-600" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-orange-600 transition-colors"
              >
                <LuUpload className="text-xs" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <img
                src={formData.icon}
                alt="Expense icon"
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={removeIcon}
                className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2 text-center">
            {!formData.icon ? 'Click + to upload icon' : 'Click ✕ to remove'}
          </p>
        </div>
      </div>

      {/* Expense Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <LuTag className="inline mr-2" />
          Expense Category *
        </label>
        <Input
          type="text"
          value={formData.category}
          onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
          placeholder="e.g., Food, Transport, Shopping, etc."
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <LuDollarSign className="inline mr-2" />
          Amount *
        </label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange({ target: { name: 'amount', value: e.target.value } })}
          placeholder="0.00"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <LuCalendar className="inline mr-2" />
          Date *
        </label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => handleChange({ target: { name: 'date', value: e.target.value } })}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            <>
              <LuDollarSign className="text-base" />
              Add Expense
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => {
            console.log('Cancel button clicked, onCancel function:', typeof onCancel);
            if (onCancel) {
              onCancel();
            } else {
              console.error('onCancel function not provided!');
            }
          }}
          disabled={loading}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddExpenseForm