interface SettingsTabProps {
    tabs: {
        id: string;
        name: string;
        icon: React.ReactNode;
    }[];
    activeTab:string;
    setActiveTab: (tabId: string) => void;
}



const SettingsTab: React.FC<SettingsTabProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${
            activeTab === tab.id
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center space-x-2">
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        </button>
      ))}
    </nav>
  </div>
);

export default SettingsTab;
