import React, { CSSProperties, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import * as itemTypes from './itemTypes';

const style:CSSProperties = {
  width: 'auto',
  margin: '5px',
  padding: '5px',
  background: '#f66f1b',
  border: '2px solid grey',
  cursor: 'move',
};

export type moveCard = (dragIndex: number, hoverIndex: number) => void;

interface ICardProps {
  text: string,
  id: string;
  index: number;
  moveCard: moveCard;
}

// useDrag 拖动源 DragSource useDrop 放置目标 DropTarget
const Card:React.FC<ICardProps> = ({ text, id, index, moveCard }) => {

  const ref = useRef<HTMLDivElement>(null);

  // 提供一种将组件作为拖动源链接到react-dnd中的方法
  // DragSource Ref拖动源的连接器，连接真是DOM和React-dnd
  let [{ isDragging }, drag] = useDrag({
    type: itemTypes.CARD,
    item: () => ({ id, index }), // 一个函数或者对象，用于描述拖动源的JS对象
    // 用来收集对象，用来收集属性，并将属性合并到组件的属性中
    // monitor存放一些拖动的状态，当拖动状态发生改变时通知组件重新获取属性并刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: itemTypes.CARD, // 设置的接受的拖动源类型
    collect: () => ({}),
    hover: (item: ICardProps, monitor) => {
      // 正在被拖动的index
      const dragIndex = item.index;
      // 当前正在被hover的index
      const hoverIndex = index;
      if(dragIndex === hoverIndex) {
        return;
      }
      const { top, bottom } = (ref.current as HTMLDivElement).getBoundingClientRect();
      const halfHoverHeight = (bottom - top) / 2;
      // @ts-ignore
      const { y } = monitor.getClientOffset(); // event.clientY
      const hoverClientY = y - top;
      if(
        (dragIndex < hoverIndex && hoverClientY > halfHoverHeight)
        || (dragIndex > hoverIndex && hoverClientY < halfHoverHeight)
      ) {
        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  })

  const opacity:number = isDragging ? 0.8 : 1;

  drag(ref); //(node, options)
  drop(ref);

  return (
    <div style={{ ...style, opacity }} ref={ref}>
      {text}
    </div>
  )
}

export default Card;
