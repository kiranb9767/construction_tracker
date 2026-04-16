
const CardNameAndNumber = ({ name, value }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
      <div className="text-red-500 text-sm font-semibold">{name}</div>
      <div className="text-xl font-semibold">
        {value.toLocaleString()}
      </div>
    </div>
  )
}

export default CardNameAndNumber