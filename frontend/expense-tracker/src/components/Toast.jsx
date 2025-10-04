import React, { useEffect } from 'react'
import { LuCheck, LuX } from 'react-icons/lu'

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-green-50 border-green-200 text-green-800'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <LuCheck className="text-green-600" size={20} />
      case 'error':
        return <LuX className="text-red-600" size={20} />
      default:
        return <LuCheck className="text-green-600" size={20} />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${getToastStyles()}`}>
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <LuX size={16} />
        </button>
      </div>
    </div>
  )
}

export default Toast