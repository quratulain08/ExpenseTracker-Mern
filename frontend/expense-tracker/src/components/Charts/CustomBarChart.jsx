import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';

const CustomBarChart = ({data}) => {


    const getBarColor = (index) => {
        const COLORS = [
     
  '#0ea5e9', // sky blue
    '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#10b981',  // emerald
  
  '#eab308', // amber

 
];
        return COLORS[index % COLORS.length];
    }

    const CustomTooltip=({active,payload})=>{
        if(active && payload && payload.length){
        return  (
            <div className='bg-white p-3 shadow-md border border-gray-300 rounded-lg'>
               <p className='text-xs font-semibold text-teal-800 mb1'>
                {payload[0].payload.category}
                </p>

        <p className='text-sm text-gray-600'>
            Amount: <span className='font-medium text-gray-900 text-sm'>${payload[0].payload.amount}</span>
                </p>

                
                </div>

        );
        } 
        return null;
    }
        
  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart
        data={data}>
        <CartesianGrid stroke="none" />
        <XAxis dataKey="category" tick={{fontSize:12, fill:'#555'}} stroke='none' />
        <YAxis tick={{fontSize:12, fill:'#555'}} stroke='none' />
        <Tooltip content={CustomTooltip} />

        <Bar
        dataKey="amount"
        fill='#FF8042'
        radius={[10,10,0,0]}
        activeDot={{ r: 8, fill:"yellow"}}
        activeStyle={{fill:"green"}}
        >

        {data.map((entry,index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
        ))}
        </Bar>

         
        </BarChart>

        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart