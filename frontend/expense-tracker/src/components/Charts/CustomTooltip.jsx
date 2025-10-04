import React from 'react'

const CustomTooltip = ({active,payload}) => {
    if(active && payload && payload.length){
  return (
    <div className='bg-white p-3 shadow-md border border-gray-200 rounded-md'>
        <p className='text-sm font-semibold'>{payload[0].name}</p>
        <p className='text-sm'>
            Amount: <span className=" font-medium">{payload[0].value}</span>
             </p>
    </div>
  );
}
    return null;
}

export default CustomTooltip