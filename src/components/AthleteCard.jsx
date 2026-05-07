export default function AthleteCard({ athlete, discipline }) {
  const genderLabel = athlete.gender === 'F' ? 'Women' : 'Men'

  return (
    <div className={`athlete-card lane-${athlete.lane}`}>
      <div className="athlete-lane-header">
        <span className={`lane-badge disc-color-${discipline}`}>LANE {athlete.lane}</span>
        <span className="athlete-name">{athlete.name}</span>
        {athlete.missing_data && (
          <span className="missing-badge" title="Incomplete profile">⚠</span>
        )}
      </div>

      <div className="athlete-meta">
        <span className="meta-item">{athlete.country_code}</span>
        <span className="meta-sep">·</span>
        <span className="meta-item">{genderLabel}</span>
        <span className="meta-sep">·</span>
        <span className="meta-item"><strong>PB</strong> {athlete.personal_best}</span>
        <span className="meta-sep">·</span>
        <span className="meta-item"><strong>AIM</strong> {athlete.announced_performance}</span>
      </div>

      {athlete.pronunciation && (
        <div className="athlete-pronunciation">
          🗣 SAY: <strong>{athlete.pronunciation}</strong>
        </div>
      )}

      {athlete.notes && athlete.notes.length > 0 ? (
        <ul className="athlete-notes">
          {athlete.notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      ) : (
        <p className="no-notes">No notes available.</p>
      )}
    </div>
  )
}
