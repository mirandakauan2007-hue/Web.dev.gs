import { lines } from '../hooks/useOccupancy';

export default function StationSelector({ line, station, stations, onLineChange, onStationChange }) {
  return <div className="route-selectors">
    <label className="field-label">1. ESCOLHA A LINHA
      <select value={line} onChange={(event) => onLineChange(event.target.value)}>
        <option value="">Selecione uma linha</option>
        {Object.keys(lines).map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
    <label className="field-label">2. ESCOLHA A ESTAÇÃO
      <select value={station} onChange={(event) => onStationChange(event.target.value)} disabled={!line}>
        <option value="">{line ? 'Selecione uma estação' : 'Escolha a linha primeiro'}</option>
        {stations.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  </div>;
}
