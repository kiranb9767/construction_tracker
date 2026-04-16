const Tabber = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="max-w-100 flex gap-8 border-b border-gray-500 mb-4 ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`pb-2 text-sm font-medium box-border radius-4 
            ${
              activeTab === tab.value
                ? "text-blue-600 border-b-4 border-blue-600 animate-pulse"
                : "text-gray-500"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
export default Tabber