import styled from "styled-components"
import { useSetRecoilState } from "recoil"
import { IToDo, toDoState } from "../atom"
import {useForm} from 'react-hook-form'
import { Draggable, Droppable } from "react-beautiful-dnd"
import Card from "./Card"

const List = styled.div<{isDragging: boolean}>`
  width: 200px;
  background-color: ${(props) => props.isDragging? 'gray' : props.theme.bordColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column; // display flex를 하면 input을 add해도 계속 늘어남
`

const Title = styled.span`
  font-size: 20px;
  text-align: center;
`

const ButtonWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-evenly;
`

const Form = styled.form`
  margin-top: 5px;
  width: 100%;
  input {
    width: 100%;
    text-align: center;
  }
`

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#3fbcf2"
      : props.isDraggingFromThis
      ? "#189a59"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`

// Form에 입력되는 type에 대해 알려줘야함
interface IForm {
  toDo: string;
}

// 각 toDos들은 IToDo 객체를 원소를 가진 배열임
interface IBoard {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

// snapshot의 isDraggingOver, isDraggingFromThis를 설명하기 위함
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;

}

function Board({index, toDos, boardId}: IBoard) {
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({toDo}: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    }
    // setRecoil: 기존 값을 불러와서 그걸 토대로 바꾸거나 그냥 새로운 값을 넣을 수도 있음
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]]
      }
    })
      setValue('toDo', '');
      // toDos는 한 Board의 전체 toDo
      // App에서 map을 통해서 Board 하나씩을 렌더링함
      localStorage.setItem(boardId, JSON.stringify([newToDo, ...toDos]))
  }

  const cleanBoard = () => {
    setToDos(allBords => {
      return {
        ...allBords,
        [boardId]: [],
      }
    })
  }

  // 드래그했을 때도 
  const loading = () => {
    const item = localStorage.getItem(boardId);
    if(!item) return;
    const getItem = JSON.parse(item);
    setToDos(allBords => {
      return {
        ...allBords,
        [boardId]: getItem,
      }
    })
  }

/*
  const deleteBoard = () => {
    setToDos(allBoards => {
      const boardCopy = allBoards;
      delete boardCopy[boardId]
      return boardCopy;
    })
  }

    const deleteBoard = () => {
    setToDos(allBoards => {
      delete allBoards[boardId]
      return allBoards
    })
  }

  위 두 개 다 안됨, 아예 새로운 객체를 리턴해줘야 하는듯
  const boardCopy = allBoards 하면 같은 주소 공간을 가리키게 됨
*/

  const deleteBoard = () => {
    setToDos((allBoards) => {
      const copy = {...allBoards};
      delete copy[boardId];
      return {...copy};
    })
  }

  return (
    <Draggable key={boardId} draggableId={boardId+''} index={index}>
  {(magic, snapshot) => <List
    ref={magic.innerRef}
    {...magic.draggableProps}
    isDragging={snapshot.isDragging}
    >
    <Title {...magic.dragHandleProps}>
      {boardId}
      <button onClick={deleteBoard}>X</button>
    </Title>
    <ButtonWrapper>
      <button onClick={cleanBoard}>새로고침</button>
      <button onClick={loading}>불러오기</button>
    </ButtonWrapper>
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('toDo', {required: true})}
        type='text'
        placeholder={`Add Task on ${boardId}`}
      />
    </Form>
    <Droppable droppableId={boardId}>
      {(magic, snapshot) => (
        //  ref={magic.innerRef} {...magic.droppableProps}는 필수
        <Area
          isDraggingOver={snapshot.isDraggingOver}
          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          ref={magic.innerRef}
          {...magic.droppableProps}
          >
            {/* toDos는 IToDo[], toDo는 IToDo, IToDo에는 id와 text가 있음 */}
            {toDos.map((toDo, idx) => (
              <Card key={toDo.id} index={idx} listId={toDo.id} text={toDo.text} />
            ))}
          {/* 칸의 크기를 일정하게 해줌 */}
          {magic.placeholder} 
        </Area>
      )}
    </Droppable>
  </List>
  }
</Draggable>


  )
}

export default Board

export{}

