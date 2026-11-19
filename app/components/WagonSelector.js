const wagons = [
  { number: 1, label: 'Lotado', state: 'full' },
  { number: 4, label: 'Vazio', state: 'empty' },
  { number: 8, label: 'Moderado', state: 'medium' },
];

export default function WagonSelector({ selected, onSelect }) {
  return (
    <section className="wagon-section" aria-label="Escolha do vagão">
      <div className="time-heading">
        <div>
          <h3>Escolha seu vagão</h3>
          <p>Previsão estimada por carro</p>
        </div>
      </div>

      <div className="wagon-options">
        {wagons.map((wagon) => {
          const isSelected = selected === wagon.number;

          return (
            <button
              key={wagon.number}
              type="button"
              className={`wagon-option ${isSelected ? 'chosen' : ''}`}
              onClick={() => onSelect(wagon.number)}
              aria-pressed={isSelected}
            >
              <span>Vagão {wagon.number}</span>
              <span>
                <i className={`dot ${wagon.state}`} aria-hidden="true" /> {wagon.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}