import React from 'react'

function Button({label, onClick=() => alert('click')}:any) {
  return (
    <input type='button' value={label} onClick={onClick}  style={{
      position: 'fixed',
      width: 'fit-content',
    padding: '1.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    background: '#C1DC3A',
    borderRadius: '10px',
    border: 'none',
    zIndex: 100,
    bottom: '2rem',
    right: '2rem',
    fontSize: '19px',
    fontWeight: '300',
    }} />
  )
}

export default Button