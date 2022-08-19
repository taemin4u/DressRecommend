import {atom} from 'recoil'

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [],
    DOING: [],
    DONE: [],
  },
});

export const boardIndex = atom({
  key: 'idx',
  default: ['TO DO', 'DOING', 'DONE'],
})
export{}
/*
toDoState는 string key를 가지고 IToDo 객체 배열을 가진다는 것을 알려줌

IToDo는 프로퍼티로 number인 id와 string인 text를 가진다는 것을 알려주기 위해 IToDo 선언

한 변수당 하나의 interface를 가진다는 느낌
*/ 