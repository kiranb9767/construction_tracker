import React from 'react'

const ProgressBar = ({percentage}) => {
 const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const PROGRESS_BAR_COLOR =   safePercentage < 50
      ? "bg-green-500"
      : safePercentage <= 80
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
     <div className="w-full h-2 bg-gray-200 rounded">
        <div className={`h-2 ${PROGRESS_BAR_COLOR} rounded`} style={{ width: `${safePercentage}%` }}></div>
    </div>
  )
}

export default ProgressBar