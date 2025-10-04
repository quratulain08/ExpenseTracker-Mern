import React from "react";
import { LuUtensils,LuTrendingUp,LuTrendingDown,LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
hideDeleteBtn,
}) => {

  const getAmountStyles = () => 
  type === "income"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  
    

  return <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg  hover:bg-gray-100/60">
    <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
  {typeof icon === "string" ? (
    <img src={icon} alt={title} className="w-8 h-8 rounded-full object-cover" />
  ) : icon ? (
    icon
  ) : (
    <LuUtensils />
  )}
</div>


    <div className="flex-1 flex items-center justify-between">
      <h6 className="text-sm font-medium text-gray-700">{title}</h6>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>


    <div className="flex items-center gap-2">
      {!hideDeleteBtn && (
        <button className="textgray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        ><LuTrash2  size={18}/></button>
      )}

      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
        <h6 className="text-xs font-medium">
          {type === "income" ? "+ " : "- "} ${amount}
        </h6>
        {type === "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
      </div>


    </div>
    
    </div>
};

export default TransactionInfoCard;
