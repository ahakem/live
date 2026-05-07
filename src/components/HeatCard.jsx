import AthleteCard from './AthleteCard'

const DISC_LABEL = { DNF: 'Dynamic No Fins', DYNB: 'Dynamic Bi-Fins', DYN: 'Dynamic Monofin' }

export default function HeatCard({ heat, expanded, onToggle }) {
  return (
    <div className={`heat-card disc-${heat.discipline} ${expanded ? 'expanded' : ''}`}>
      <button className="heat-header" onClick={onToggle} aria-expanded={expanded}>
        <div className="heat-title">
          <span className={`disc-badge disc-badge-${heat.discipline}`}>{heat.discipline}</span>
          <span className="heat-num">Heat {heat.heat_number}</span>
          <span className="heat-disc-name">{DISC_LABEL[heat.discipline]}</span>
        </div>
        <div className="heat-times">
          <span className="time-item">
            <span className="time-label">TOP</span>
            <span className="time-val">{heat.official_top}</span>
          </span>
          <span className="time-item">
            <span className="time-label">WU</span>
            <span className="time-val">{heat.warm_up}</span>
          </span>
          <span className="heat-athletes-preview">
            {heat.athletes.map(a => a.name.split(' ')[0]).join(' · ')}
          </span>
          <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="heat-body">
          <div className="athletes-grid">
            {heat.athletes.map((a, i) => (
              <AthleteCard
                key={a.athlete_id}
                athlete={a}
                discipline={heat.discipline}
                showSeparator={i > 0}
              />
            ))}
          </div>

          {heat.transition && (
            <div className="heat-transition">
              <span className="transition-arrow">→</span>
              <em>{heat.transition}</em>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
