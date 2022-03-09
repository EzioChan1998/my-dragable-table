import React, {CSSProperties, useState} from 'react';
import Card, { moveCard } from './Card';

const style:CSSProperties = {
  width: '300px',
};

const Container = () => {

  const [cards, setCards] = useState([
    { id: 'card1', text: '卡片1' },
    { id: 'card2', text: '卡片2' },
    { id: 'card3', text: '卡片3' },
  ])

  const moveCard:moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    let cloneCards = [...cards];
    cloneCards.splice(dragIndex, 1);
    cloneCards.splice(hoverIndex, 0, dragCard);
    setCards(cloneCards);
  }

  return (
    <div style={style}>
      {cards.map((item, index) =>
        <Card
          text={item.text}
          key={item.id}
          id={item.id}
          index={index}
          moveCard={moveCard}
        />
      )}
    </div>
  )
}

export default Container;
