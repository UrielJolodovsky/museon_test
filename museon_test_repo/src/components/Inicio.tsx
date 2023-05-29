import React from 'react'

const Inicio = () => {

  const handleClickButton = () => {
    window.location.href = '/login'
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
        <div className="btn-container">
          <button className='start-btn' onClick={handleClickButton}></button>
        </div>
      </div>
    </div>
  )
}

export default Inicio