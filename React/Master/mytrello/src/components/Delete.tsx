
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled.span<{isDraggingOver: boolean}>`
  display: inline-block;
  padding-left: 20px;
  width: 100px;
  text-align: center;
  font-size: 100px;
  margin-top: 30px;
`

function Delete() {
  return (
    <Droppable droppableId="delete">
      {(magic, snapshot) => (
        <Wrapper
          isDraggingOver={snapshot.isDraggingOver}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {snapshot.isDraggingOver ? // 이렇게 하면 쓸 수 있다.
            <FontAwesomeIcon className="trash" icon={faTrash} color='red' spin/> : 
            <FontAwesomeIcon className="trash" icon={faTrash} color='white' />}
        </Wrapper>
      )}
    </Droppable>
  )
}

export default Delete
export{}