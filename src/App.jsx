import { useState, useEffect } from 'react';
import './App.css';

// Importar componentes
import TabSelector from './components/TabSelector';
import PositionSizeCalculator from './components/PositionSizeCalculator';
import RiskRewardCalculator from './components/RiskRewardCalculator';
import PipCalculator from './components/PipCalculator';
import MarginCalculator from './components/MarginCalculator';

function App() {
  // Estado para gestionar pestañas activas
  const [activeTab, setActiveTab] = useState('position');
  
  // Manejador de eventos para tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // La lógica de cálculo ahora se maneja en cada componente
      // Este manejador podría ser ampliado si se necesita funcionalidad adicional
    }
  };
  
  // Efecto para añadir el event listener para la tecla Enter
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    
    // Limpiar event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [activeTab]); // Dependencia reducida al solo ser necesario activeTab
  
  return (
    <div className="container">
      <h1>📊 Calculadora de Riesgo - Trading</h1>
      
      {/* Componente de selector de pestañas */}
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenido de pestañas usando componentes modulares */}
      <div className={`tab-content ${activeTab === 'position' ? 'active' : ''}`}>
        <PositionSizeCalculator />
      </div>

      <div className={`tab-content ${activeTab === 'risk-reward' ? 'active' : ''}`}>
        <RiskRewardCalculator />
      </div>

      <div className={`tab-content ${activeTab === 'pip' ? 'active' : ''}`}>
        <PipCalculator />
      </div>

      <div className={`tab-content ${activeTab === 'margin' ? 'active' : ''}`}>
        <MarginCalculator />
      </div>
    </div>
  );
}

export default App;