import { useState } from 'react';

const RiskRewardCalculator = () => {
  const [values, setValues] = useState({
    entry: 100,
    stop: 95,
    target: 110,
    positionSize: 1000,
    winRate: 50
  });
  
  const [results, setResults] = useState({
    ratio: '-',
    risk: '-',
    reward: '-',
    expectancy: '-',
    profitable: '-',
    isProfitable: false,
    showResults: false
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id === 'rr-entry' ? 'entry' : 
       id === 'rr-stop' ? 'stop' :
       id === 'rr-target' ? 'target' :
       id === 'rr-position-size' ? 'positionSize' :
       id === 'rr-win-rate' ? 'winRate' : id]: parseFloat(value)
    });
  };
  
  const calculateRiskReward = () => {
    const { entry, stop, target, positionSize, winRate } = values;
    
    const risk = Math.abs(entry - stop) * positionSize;
    const reward = Math.abs(target - entry) * positionSize;
    const ratio = reward / risk;
    
    // Cálculo de expectativa matemática
    const winRateFraction = winRate / 100;
    const expectancy = (winRateFraction * reward) - ((1 - winRateFraction) * risk);
    const isProfitable = expectancy > 0;
    
    setResults({
      ratio: `1:${ratio.toFixed(2)}`,
      risk: `$${risk.toFixed(2)}`,
      reward: `$${reward.toFixed(2)}`,
      expectancy: `$${expectancy.toFixed(2)}`,
      profitable: isProfitable ? '✅ SÍ' : '❌ NO',
      isProfitable,
      showResults: true
    });
  };
  
  const resetRiskReward = () => {
    setValues({
      entry: 100,
      stop: 95,
      target: 110,
      positionSize: 1000,
      winRate: 50
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
            <label htmlFor="rr-entry">Precio de Entrada</label>
            <input 
              type="number" 
              id="rr-entry" 
              value={values.entry} 
              min="0" 
              step="0.01"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="rr-stop">Stop Loss</label>
            <input 
              type="number" 
              id="rr-stop" 
              value={values.stop} 
              min="0" 
              step="0.01"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="rr-target">Take Profit</label>
            <input 
              type="number" 
              id="rr-target" 
              value={values.target} 
              min="0" 
              step="0.01"
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <div className="input-group">
            <label htmlFor="rr-position-size">Tamaño de Posición</label>
            <input 
              type="number" 
              id="rr-position-size" 
              value={values.positionSize} 
              min="0" 
              step="1"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="rr-win-rate">Tasa de Acierto (%)</label>
            <input 
              type="number" 
              id="rr-win-rate" 
              value={values.winRate} 
              min="0" 
              max="100" 
              step="1"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="button-group">
        <button onClick={calculateRiskReward}>Calcular R/R</button>
        <button onClick={resetRiskReward}>Limpiar</button>
      </div>
      
      {results.showResults && (
        <div className="results">
          <div className="result-item">
            <span className="result-label">Ratio Risk/Reward:</span>
            <span className="result-value">{results.ratio}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Riesgo ($):</span>
            <span className="result-value loss">{results.risk}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Recompensa ($):</span>
            <span className="result-value profit">{results.reward}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Expectativa Matemática:</span>
            <span className="result-value">{results.expectancy}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Rentable?:</span>
            <span className={`result-value ${results.isProfitable ? 'profit' : 'loss'}`}>
              {results.profitable}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default RiskRewardCalculator;
