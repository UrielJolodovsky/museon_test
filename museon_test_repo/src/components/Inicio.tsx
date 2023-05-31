import React from 'react'

const Inicio = () => {

  const handleClickButton = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className='start-container'>
      <div className="container-start-items">
        <h1 className="start-title">
          Hola quere dashboard?¡?¡
        </h1>
        <h2 className='start-subtitle'>
          Apreta aquí¡!!
        </h2>
          <button className='start-btn' onClick={handleClickButton}></button>
      </div>
    </div>
  )
}

export default Inicio