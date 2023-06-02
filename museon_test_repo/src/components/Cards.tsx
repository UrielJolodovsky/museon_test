import React, { useState } from 'react'
import { ICardsProps } from '@/types'

type CardType = {
    id: number;
    number: number;
    title: string;
}

const Cards = () => {

    const [cards, setCards] = useState<CardType[]>([])


    const addCard = () => {
        setCards([...cards, {
            id: cards.length,
            number: cards.length,
            title: "Card"  
        }])
    }

    const removeCard = () => {
        setCards(cards.slice(0, -1))
    }

    return (
        <div className='cards-container'>
            <h1 className="cards-title">Agrega cards:</h1>
            <div className="cards-items">
                {cards.map(({ id, title }) => (
                    <div key={id}>{title}</div>
                ))}
                <button onClick={() => addCard()}>Agregar Card</button>
                <button onClick={() => removeCard()}>Sacar Card</button>
            </div>

        </div>
    )
}

export default Cards
