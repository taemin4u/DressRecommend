import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Area = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
  props.isDragging ? "#beda21" : props.theme.cardColor};
  box-shadow: ${(props) =>
  props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`

interface ICard {
  index: number;
  listId: number;
  text: string;
}

function Card({index, listId, text}:ICard) {
  return (
    <Draggable key={listId} draggableId={listId+''} index={index}>
      {(magic, snapshot) => <Area
        isDragging={snapshot.isDragging}  
        ref={magic.innerRef}
        {...magic.draggableProps} // 드래그를 사용하라고 하기 위해
        {...magic.dragHandleProps} // 어디에서 드래그가 사용될 것인지 명시
      >
      {text}
      </Area>
      }
    </Draggable>
  )
}

export default React.memo(Card);
export {}