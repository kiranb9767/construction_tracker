const CardNameAndNumber = ({ name, value }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,5)] flex items-center justify-between">
      <div className="text-gray-500 text-sm font-semibold">{name}</div>
      <div className="text-xl font-semibold text-gray-900">
        {value}
      </div>
    </div>
  );
};

export default CardNameAndNumber;