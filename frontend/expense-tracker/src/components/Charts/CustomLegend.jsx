import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div>
      {payload.map((entry, index) => (
        <div key={`legend-item-${index}`} className="flex items-center">
          <span className="block w-4 h-4 mr-2" style={{ backgroundColor: entry.color }}></span>
          <span className="text-sm">{entry.name}</span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend