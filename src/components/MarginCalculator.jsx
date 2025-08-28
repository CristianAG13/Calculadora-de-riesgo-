import { useState } from 'react';

const MarginCalculator = () => {
  const [values, setValues] = useState({
    balance: 10000,
    leverage: 100,
    position: 100000,
    price: 1.1000
  });
  
  const [results, setResults] = useState({
    marginRequired: '-',
    marginFree: '-',
    marginLevel: '-',
    buyingPower: '-',
    marginLevelClass: '',
    showResults: false
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id === 'margin-balance' ? 'balance' : 
       id === 'margin-leverage' ? 'leverage' :
       id === 'margin-position' ? 'position' :
       id === 'margin-price' ? 'price' : id]: parseFloat(value)
    });
  };
  
  const calculateMargin = () => {
    const { balance, leverage, position } = values;
    
    const marginRequired = position / leverage;
    const marginFree = balance - marginRequired;
    const marginLevel = (balance / marginRequired) * 100;
    const buyingPower = balance * leverage;
    
    let marginLevelClass = '';
    if (marginLevel < 100) {
      marginLevelClass = 'loss';
    } else if (marginLevel > 200) {
      marginLevelClass = 'profit';
    }
    
    setResults({
      marginRequired: `$${marginRequired.toFixed(2)}`,
      marginFree: `$${marginFree.toFixed(2)}`,
      marginLevel: `${marginLevel.toFixed(2)}%`,
      buyingPower: `$${buyingPower.toFixed(0)}`,
      marginLevelClass,
      showResults: true
    });
  };
  
  const resetMargin = () => {
    setValues({
      balance: 10000,
      leverage: 100,
      position: 100000,
      price: 1.1000
    });
    
    setResults({
      ...results,
      showResults: false
    });
  };
  
  return (
    <>
      <div className="calculator-grid">
        <div>
          <div className="input-group">
            <label htmlFor="margin-balance">Balance de Cuenta ($)</label>
            <input 
              type="number" 
              id="margin-balance" 
              value={values.balance} 
              min="0" 
              step="100"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="margin-leverage">Apalancamiento</label>
            <select id="margin-leverage" value={values.leverage} onChange={handleChange}>
              <option value="1">1:1</option>
              <option value="10">1:10</option>
              <option value="30">1:30</option>
              <option value="50">1:50</option>
              <option value="100">1:100</option>
              <option value="200">1:200</option>
              <option value="500">1:500</option>
            </select>
          </div>
        </div>
        
        <div>
          <div className="input-group">
            <label htmlFor="margin-position">Tamaño de Posición ($)</label>
            <input 
              type="number" 
              id="margin-position" 
              value={values.position} 
              min="0" 
              step="1000"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="margin-price">Precio Actual</label>
            <input 
              type="number" 
              id="margin-price" 
              value={values.price} 
              min="0" 
              step="0.0001"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="button-group">
        <button onClick={calculateMargin}>Calcular Margen</button>
        <button onClick={resetMargin}>Limpiar</button>
      </div>
      
      {results.showResults && (
        <div className="results">
          <div className="result-item">
            <span className="result-label">Margen Requerido:</span>
            <span className="result-value">{results.marginRequired}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Margen Libre:</span>
            <span className="result-value profit">{results.marginFree}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Nivel de Margen:</span>
            <span className={`result-value ${results.marginLevelClass}`}>
              {results.marginLevel}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">Poder de Compra:</span>
            <span className="result-value">{results.buyingPower}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MarginCalculator;
