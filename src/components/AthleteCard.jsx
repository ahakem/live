const REPEAT_LINES = [
  (fn, prev, curr) => `Back from ${prev}! ${fn} already had a dive earlier — now it's ${curr}. Same pool, different challenge.`,
  (fn, prev, curr) => `You already cheered for ${fn} in ${prev} — give them another round for ${curr}!`,
  (fn, prev, curr) => `${fn} is doing double duty today. ${prev} done, ${curr} up next. Multi-discipline respect.`,
  (fn, prev, curr) => `No rest for ${fn}! After ${prev}, straight into ${curr}. That's competition spirit.`,
  (fn, prev, curr) => `${fn} again! If you loved them in ${prev}, you're in luck — ${curr} is next.`,
  (fn, prev, curr) => `Round two for ${fn}! ${prev} is in the books — let's see what ${curr} brings out.`,
  (fn, prev, curr) => `${fn} swam in ${prev} earlier today and now they're back for ${curr}. The crowd already knows this name.`,
  (fn, prev, curr) => `Not done yet! ${fn} finished ${prev} and jumped straight onto the ${curr} start list.`,
]

function repeatLine(athlete, prevDisc, currDisc) {
  const fn = athlete.name.split(' ')[0]
  const idx = parseInt(athlete.athlete_id.replace('ATH-', ''), 10)
  return REPEAT_LINES[idx % REPEAT_LINES.length](fn, prevDisc, currDisc)
}

export default function AthleteCard({ athlete, discipline, showSeparator }) {
  const genderLabel = athlete.gender === 'F' ? 'Women' : 'Men'
  const isRepeat = !!athlete.prevDisc

  return (
    <>
      {showSeparator && <div className="athlete-separator" />}
      <div className={`athlete-card${isRepeat ? ' athlete-repeat' : ''}`}>
        <div className="athlete-lane-header">
          <span className={`lane-badge disc-color-${discipline}`}>LANE {athlete.lane}</span>
          <span className="athlete-name">{athlete.name}</span>
          {isRepeat && (
            <span className="repeat-badge">↩ {athlete.prevDisc}</span>
          )}
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
            SAY: <strong>{athlete.pronunciation}</strong>
          </div>
        )}

        {isRepeat ? (
          <p className="repeat-line">{repeatLine(athlete, athlete.prevDisc, discipline)}</p>
        ) : athlete.notes && athlete.notes.length > 0 ? (
          <ul className="athlete-notes">
            {athlete.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        ) : (
          <p className="no-notes">No notes available.</p>
        )}
      </div>
    </>
  )
}
