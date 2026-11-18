import { periods } from '../hooks/useOccupancy';

export default function PeriodSelector({ period, onChange }) {
  return <label className="field-label period-selector">3. ESCOLHA O PERÍODO
    <select value={period} onChange={(event) => onChange(event.target.value)}>
      {Object.keys(periods).map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
  </label>;
}