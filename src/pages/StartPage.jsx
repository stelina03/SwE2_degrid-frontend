import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import logo from '../assets/logo.png'

export default function StartPage(){
  const nav = useNavigate()
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <img src={logo} alt="Degrid Logo" style={{ width: '180px', marginBottom: '16px' }} />
      <h1 style={{ margin: '8px 0', fontSize: '2rem' }}>Degrid</h1>
      <p style={{ margin: '12px 0', fontSize: '1rem', opacity: 0.9 }}>Start the game.</p>
      <button 
        className="primary" 
        onClick={async () => {
          try { await api.post('/game/reset') } catch(e) { /* ignore */ }
          nav('/grid')
        }}
        style={{ marginTop: '8px' }}
      >
        START GAME
      </button>
    </div>
  )
}
