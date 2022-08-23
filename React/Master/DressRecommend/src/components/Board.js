import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => (props.isDragging ? '#beda21' : 'green')};
  width: 300px;
  height: 300px;
`;
const Image = styled.img`
  display: block;
  margin: 20px;
  background-color: red;
`;
function Board({ item, index }) {
  return (
    <Draggable draggableId={index + ''} index={index}>
      {(magic, snapshot) => (
        <Container
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Image src={item} alt={'image' + index} />
        </Container>
      )}
    </Draggable>
  );
}

export default Board;
