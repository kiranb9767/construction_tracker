
const CardNameAndNumber = ({name, value} ) => {
  return (
    <div className="p-4  bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-[0_8px_6px_-1px_rgba(0,0,0,0.5)] flex items-center justify-between">
      <div className="text-gray-500 text-sm font-semibold">{name}</div>
      <div className="text-xl font-semibold">
        {value}
      </div>
    </div>
  )
}

export default CardNameAndNumber