import { useState } from 'react';

const PositionSizeCalculator = () => {
  const [values, setValues] = useState({
    accountBalance: 10000,
    riskPercentage: 2,
    entryPrice: 1.1000,
    stopLoss: 1.0950,
    takeProfit: 1.1100,
    leverage: 100,
    currencyPair: 'EUR/USD'
  });
  
  const [results, setResults] = useState({
    positionSize: '-',
    riskAmount: '-',
    potentialProfit: '-',
    rrRatio: '-',
    pipsRisk: '-',
    showResults: false,
    showWarning: false
  });
  
  const handleRiskSliderChange = (e) => {
    setValues({
      ...values,
      riskPercentage: parseFloat(e.target.value)
    });
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id === 'account-balance' ? 'accountBalance' : 
       id === 'entry-price' ? 'entryPrice' :
       id === 'stop-loss' ? 'stopLoss' :
       id === 'take-profit' ? 'takeProfit' :
       id === 'leverage' ? 'leverage' :
       id === 'currency-pair' ? 'currencyPair' : id]: parseFloat(value) || value
    });
  };
  
  const calculatePosition = () => {
    const { accountBalance, riskPercentage, entryPrice, stopLoss, takeProfit } = values;
    
    const riskAmount = accountBalance * (riskPercentage / 100);
    const pipsRisk = Math.abs(entryPrice - stopLoss) * 10000;
    const pipsProfit = Math.abs(takeProfit - entryPrice) * 10000;
    const positionSize = (riskAmount / pipsRisk) * 10000;
    const potentialProfit = (pipsProfit / pipsRisk) * riskAmount;
    const rrRatio = pipsProfit / pipsRisk;
    
    setResults({
      positionSize: `${positionSize.toFixed(2)} units`,
      riskAmount: `$${riskAmount.toFixed(2)}`,
      potentialProfit: `$${potentialProfit.toFixed(2)}`,
      rrRatio: `1:${rrRatio.toFixed(2)}`,
      pipsRisk: `${pipsRisk.toFixed(1)} pips`,
      showResults: true,
      showWarning: riskPercentage > 5
    });
  };
  
  const resetPosition = () => {
    setValues({
      accountBalance: 10000,
      riskPercentage: 2,
      entryPrice: 1.1000,
      stopLoss: 1.0950,
      takeProfit: 1.1100,
      leverage: 100,
      currencyPair: 'EUR/USD'
    });
    
    setResults({
      ...results,
      showResults: false,
      showWarning: false
    });
  };
  
  return (
    <>
      <div className="calculator-grid">
        <div>
          <div className="input-group">
            <label htmlFor="account-balance">Balance de la Cuenta ($)</label>
            <input 
              type="number" 
              id="account-balance" 
              value={values.accountBalance} 
              min="0" 
              step="100"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="risk-percentage">Riesgo por Operación (%)</label>
            <div className="slider-container">
              <input 
                type="range" 
                id="risk-percentage-slider" 
                className="slider" 
                min="0.5" 
                max="10" 
                step="0.5" 
                value={values.riskPercentage}
                onChange={handleRiskSliderChange}
              />
              <div className="slider-value">{values.riskPercentage}%</div>
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="entry-price">Precio de Entrada</label>
            <input 
              type="number" 
              id="entry-price" 
              value={values.entryPrice} 
              min="0" 
              step="0.0001"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="stop-loss">Stop Loss</label>
            <input 
              type="number" 
              id="stop-loss" 
              value={values.stopLoss} 
              min="0" 
              step="0.0001"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <div className="input-group">
            <label htmlFor="take-profit">Take Profit</label>
            <input 
              type="number" 
              id="take-profit" 
              value={values.takeProfit} 
              min="0" 
              step="0.0001"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="leverage">Apalancamiento</label>
            <select id="leverage" value={values.leverage} onChange={handleChange}>
              <option value="1">1:1</option>
              <option value="10">1:10</option>
              <option value="30">1:30</option>
              <option value="50">1:50</option>
              <option value="100">1:100</option>
              <option value="200">1:200</option>
              <option value="500">1:500</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="currency-pair">Par de Divisas</label>
            <select id="currency-pair" value={values.currencyPair} onChange={handleChange}>
              <option value="EUR/USD">EUR/USD</option>
              <option value="GBP/USD">GBP/USD</option>
              <option value="USD/JPY">USD/JPY</option>
              <option value="USD/CHF">USD/CHF</option>
              <option value="AUD/USD">AUD/USD</option>
              <option value="USD/CAD">USD/CAD</option>
              <option value="NZD/USD">NZD/USD</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="button-group">
        <button onClick={calculatePosition}>Calcular Posición</button>
        <button onClick={resetPosition}>Limpiar</button>
      </div>
      
      {results.showResults && (
        <div className="results">
          <div className="result-item">
            <span className="result-label">Tamaño de Posición:</span>
            <span className="result-value">{results.positionSize}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Riesgo en $:</span>
            <span className="result-value loss">{results.riskAmount}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Ganancia Potencial:</span>
            <span className="result-value profit">{results.potentialProfit}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Ratio Risk/Reward:</span>
            <span className="result-value">{results.rrRatio}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Pips en Riesgo:</span>
            <span className="result-value">{results.pipsRisk}</span>
          </div>
        </div>
      )}
      
      {results.showWarning && (
        <div className="warning show">
          ⚠️ Advertencia: El riesgo supera el 5% de tu cuenta. Considera reducir el tamaño de la posición.
        </div>
      )}
    </>
  );
};

export default PositionSizeCalculator;
