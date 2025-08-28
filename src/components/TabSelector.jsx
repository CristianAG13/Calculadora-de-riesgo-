const TabSelector = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'position', label: 'Tamaño de Posición' },
    { id: 'risk-reward', label: 'Risk/Reward' },
    { id: 'pip', label: 'Calculadora PIP' },
    { id: 'margin', label: 'Margen' }
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
