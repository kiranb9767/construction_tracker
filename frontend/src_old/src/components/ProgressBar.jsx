import React from 'react'

const ProgressBar = ({percentage}) => {
 const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const PROGRESS_BAR_COLOR =   safePercentage < 50
      ? "bg-gradient-to-r from-green-200 to-green-400"
      : safePercentage <= 80
      ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
      : "bg-gradient-to-r from-red-200 to-red-400";

  return (
     <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className={`h-2 ${PROGRESS_BAR_COLOR} rounded-full`} style={{ width: `${safePercentage}%` }}></div>
    </div>
  )
}

export default ProgressBar