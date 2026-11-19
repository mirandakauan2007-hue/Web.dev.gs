import { occupancyLabel } from '../hooks/useOccupancy';

const stateByLabel = {
  Vazio: 'empty',
  Moderado: 'medium',
  Lotado: 'full',
};

export default function TimeSlots({ slots, selectedTime, onSelect }) {
  return (
    <div className="slots">
      {slots.map((slot) => {
        const label = occupancyLabel(slot.value);
        const state = stateByLabel[label];
        const isSelected = selectedTime === slot.time;

        return (
          <button
            key={slot.time}
            type="button"
            className={`slot ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(slot.time)}
            aria-pressed={isSelected}
          >
            <strong>{slot.time}</strong>
            <span className={`dot ${state}`} aria-hidden="true" />
            <span>{label}</span>
            <small>{slot.value}%</small>
          </button>
        );
      })}
    </div>
  );
}