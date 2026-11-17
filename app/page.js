'use client';
import AppHeader, { Brand } from './components/AppHeader';
import DelayForm from './components/DelayForm';
import DelayList from './components/DelayList';
import OccupancyCard from './components/OccupancyCard';
import PeriodSelector from './components/PeriodSelector';
import PrioritySeats from './components/PrioritySeats';
import StationSelector from './components/StationSelector';
import SuggestionCard from './components/SuggestionCard';
import TimeSlots from './components/TimeSlots';
import WagonSelector from './components/WagonSelector';
import useDelayReports from './hooks/useDelayReports';
import useOccupancy from './hooks/useOccupancy';

export default function HomePage() {
  const trip = useOccupancy();
  const feed = useDelayReports();
  async function editReport(report) {
    const message = window.prompt('Atualize a descrição do aviso:', report.message);
    if (message?.trim()) await feed.edit({ ...report, message: message.trim() });
  }
  async function deleteReport(id) {
    if (window.confirm('Excluir este aviso da lista?')) await feed.remove(id);
  }
  return <main id="inicio" className="min-h-screen"><AppHeader /><div className="page-shell"><section className="welcome"><div><span className="eyebrow">PLANEJE SUA VIAGEM</span><h1>Bom dia. Vamos de trem?</h1><p>Descubra como está a estação antes de sair de casa.</p></div><div className="weather"><span>☀</span><div><strong>23°</strong><small>São Paulo, SP · clima ilustrativo</small></div></div></section>
    <section id="consulta" className="trip-panel"><div className="section-heading"><div><span className="eyebrow">SUA VIAGEM, NO SEU TEMPO</span><h2>Consulte a lotação</h2></div><span className="data-note"><i /> Dados simulados</span></div><StationSelector line={trip.line} station={trip.station} stations={trip.stations} onLineChange={trip.chooseLine} onStationChange={trip.chooseStation} />
      {trip.station && <><div className="period-row"><PeriodSelector period={trip.period} onChange={trip.choosePeriod} /><span className="line-pill"><i /> {trip.line}</span></div><div className="time-heading"><div><h3>Horários da {trip.period.toLowerCase()}</h3><p>{trip.station} · escolha quando pretende embarcar</p></div></div><TimeSlots slots={trip.slots} selectedTime={trip.selectedTime} onSelect={trip.setSelectedTime} />{trip.current && <><OccupancyCard label={trip.label} value={trip.current.value} time={trip.selectedTime} /><WagonSelector selected={trip.wagon} onSelect={trip.setWagon} /><PrioritySeats /><SuggestionCard best={trip.best} onChoose={() => trip.setSelectedTime(trip.best.time)} /><div className="access-note"><span>♿</span> Informação simples para uma viagem mais confortável para todo mundo.</div></>}</>}
      {!trip.line && <p className="selection-hint">Comece escolhendo a linha do seu trajeto.</p>}{trip.line && !trip.station && <p className="selection-hint">Agora escolha uma estação da {trip.line}.</p>}</section>
    {trip.station && <DelayForm station={trip.station} line={trip.line} onSubmit={feed.add} saving={feed.saving} />}<DelayList reports={feed.reports} loading={feed.loading} error={feed.error} onEdit={editReport} onDelete={deleteReport} onRetry={feed.refresh} />
    <footer><Brand footer /><span>Projeto CitizenTech · Global Solution 2026</span><a href="#inicio">Voltar ao topo ↑</a></footer></div></main>;
}
