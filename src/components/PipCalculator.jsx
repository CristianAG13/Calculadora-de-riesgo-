import { useState } from 'react';

const PipCalculator = () => {
  const [values, setPipValues] = useState({
    pair: 'EUR/USD',
    lotSize: 1,
    accountCurrency: 'USD',
    pipCount: 50
  });
  
  const [results, setPipResults] = useState({
    pipValue: '-',
    totalValue: '-',
    showResults: false
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPipValues({
      ...values,
      [id === 'pip-pair' ? 'pair' : 
       id === 'pip-lot-size' ? 'lotSize' :
       id === 'pip-account-currency' ? 'accountCurrency' :
       id === 'pip-count' ? 'pipCount' : id]: id.includes('pip-count') ? parseFloat(value) : value
    });
  };
  
  const calculatePip = () => {
    const { pair, lotSize, pipCount } = values;
    
    // Valores PIP simplificados
    const pipValues = {
      'EUR/USD': 10,
      'GBP/USD': 10,
      'USD/JPY': 9.1,
      'USD/CHF': 10.5,
      'AUD/USD': 10,
      'USD/CAD': 9.5,
      'NZD/USD': 10
    };
    
    const pipValue = pipValues[pair] * lotSize;
    const totalValue = pipValue * pipCount;
    
    setPipResults({
      pipValue: `$${pipValue.toFixed(2)}`,
      totalValue: `$${totalValue.toFixed(2)}`,
      showResults: true
    });
  };
  
  const resetPip = () => {
    setPipValues({
      pair: 'EUR/USD',
      lotSize: 1,
      accountCurrency: 'USD',
      pipCount: 50
    });
    
    setPipResults({
      ...results,
      showResults: false
    });
  };
  
  return (
    <>
      <div className="calculator-grid">
        <div>
          <div className="input-group">
            <label htmlFor="pip-pair">Par de Divisas</label>
            <select id="pip-pair" value={values.pair} onChange={handleChange}>
              <option value="EUR/USD">EUR/USD</option>
              <option value="GBP/USD">GBP/USD</option>
              <option value="USD/JPY">USD/JPY</option>
              <option value="USD/CHF">USD/CHF</option>
              <option value="AUD/USD">AUD/USD</option>
              <option value="USD/CAD">USD/CAD</option>
              <option value="NZD/USD">NZD/USD</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="pip-lot-size">Tamaño del Lote</label>
            <select id="pip-lot-size" value={values.lotSize} onChange={handleChange}>
              <option value="0.01">0.01 (Micro)</option>
              <option value="0.1">0.1 (Mini)</option>
              <option value="1">1.0 (Standard)</option>
              <option value="10">10 (Large)</option>
            </select>
          </div>
        </div>
        
        <div>
          <div className="input-group">
            <label htmlFor="pip-account-currency">Moneda de la Cuenta</label>
            <select id="pip-account-currency" value={values.accountCurrency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="pip-count">Número de Pips</label>
            <input 
              type="number" 
              id="pip-count" 
              value={values.pipCount} 
              min="0" 
              step="1"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="button-group">
        <button onClick={calculatePip}>Calcular Valor PIP</button>
        <button onClick={resetPip}>Limpiar</button>
      </div>
      
      {results.showResults && (
        <div className="results">
          <div className="result-item">
            <span className="result-label">Valor por PIP:</span>
            <span className="result-value">{results.pipValue}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Valor Total:</span>
            <span className="result-value profit">{results.totalValue}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PipCalculator;
