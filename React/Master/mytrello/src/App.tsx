import React from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable, DropResult} from'react-beautiful-dnd'
import Board from './components/Board';
import { useRecoilState} from 'recoil';
import { toDoState } from './atom';
import Delete from './components/Delete';
import { useForm } from 'react-hook-form';

const Boards = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: center;
`

const Form = styled.form`
  position: absolute;
  left: 85%;
  top: 10%;
`

interface IForm {
  newBoard: string;
}

function App() {
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const [lists, setLists] = useRecoilState(toDoState)

  //      const newBoard = <Board toDos={[]} boardId={data.newBoard}></Board>
  const onValid = (data:IForm) => {
    setLists(allBoards => {
      return {
        ...allBoards,
        [data.newBoard]: [],
      }
    })
    setValue('newBoard', '')
  }

  const onDragEnd = (info:DropResult) => { 
    console.log(info)
    const {destination, source} = info;
    if(!destination) return;

    if(destination.droppableId ==='delete') {
      setLists((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })

    }

    else if(destination.droppableId === source.droppableId) { // same board
      setLists((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const task = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, task);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }

    else if(destination.droppableId !== source.droppableId) {
      setLists((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const sourceObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, sourceObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Delete/>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('newBoard', {required: true})}
          type='text'
          placeholder='Add a new board'
        />
      </Form>
        <Droppable droppableId='boardMove'>
          {(magic, snapshot) => (
            <Boards
              // isDraggingOver={snapshot.isDraggingOver}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {Object.keys(lists).map((list,index) => (<Board index={index} boardId={list} toDos={lists[list]} key={list}></Board>))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
    </DragDropContext>
  );
}

export default App;
