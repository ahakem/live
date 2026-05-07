export default function FilterBar({ search, onSearch, disc, onDisc }) {
  const discs = ['ALL', 'DNF', 'DYNB', 'DYN']
  const labels = { ALL: 'All', DNF: 'No Fins', DYNB: 'Bi-Fins', DYN: 'Monofin' }

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="search"
        placeholder="Search athlete or heat number…"
        value={search}
        onChange={e => onSearch(e.target.value)}
        autoComplete="off"
      />
      <div className="disc-tabs">
        {discs.map(d => (
          <button
            key={d}
            className={`disc-tab disc-tab-${d} ${disc === d ? 'active' : ''}`}
            onClick={() => onDisc(d)}
          >
            {labels[d]}
          </button>
        ))}
      </div>
    </div>
  )
}
