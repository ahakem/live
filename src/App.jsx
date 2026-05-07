import { useState, useMemo } from 'react'
import heatsData from './data/heats.json'
import HeatCard from './components/HeatCard'
import FilterBar from './components/FilterBar'
import './App.css'

export default function App() {
  const [search, setSearch] = useState('')
  const [disc, setDisc] = useState('ALL')
  const [expandedId, setExpandedId] = useState(null)

  const heatsWithRepeat = useMemo(() => {
    const seen = {}
    return heatsData.map(heat => ({
      ...heat,
      athletes: heat.athletes.map(a => {
        const prev = seen[a.athlete_id]
        if (!prev) seen[a.athlete_id] = { disc: heat.discipline }
        return { ...a, prevDisc: prev ? prev.disc : null }
      })
    }))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return heatsWithRepeat.filter(heat => {
      if (disc !== 'ALL' && heat.discipline !== disc) return false
      if (!q) return true
      if (String(heat.heat_number) === q) return true
      if (`${heat.discipline}-${heat.heat_number}`.toLowerCase().includes(q)) return true
      return heat.athletes.some(a =>
        a.name.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.country_code.toLowerCase().includes(q)
      )
    })
  }, [search, disc, heatsWithRepeat])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title">
          <span className="header-wave">🌊</span>
          <div>
            <h1>Eindhoven 2026</h1>
            <p>Live Commentary Guide</p>
          </div>
        </div>
      </header>

      <FilterBar search={search} onSearch={setSearch} disc={disc} onDisc={setDisc} />

      <main className="heat-list">
        {filtered.length === 0 && (
          <div className="empty-state">No heats match — try a name or number.</div>
        )}
        {filtered.map(heat => (
          <HeatCard
            key={heat.id}
            heat={heat}
            expanded={expandedId === heat.id}
            onToggle={() => setExpandedId(expandedId === heat.id ? null : heat.id)}
          />
        ))}
      </main>
    </div>
  )
}
