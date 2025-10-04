import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

const CustomLineBarChart = ({data}) => {

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className='bg-white p-3 shadow-md border border-gray-300 rounded-lg'>
                    <p className='text-xs font-semibold text-orange-800 mb-1'>
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
                <AreaChart 
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="category" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#f97316"
                        strokeWidth={3}
                        fill="url(#expenseGradient)"
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineBarChart