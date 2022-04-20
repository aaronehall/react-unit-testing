import { useState, ChangeEvent } from "react";
import { getToDoList } from "../services/toDoService";

export function ToDoList() {
    const [toDoList, setToDoList] = useState<string[]>(getToDoList());
    const [newToDoItem, setNewToDoItem] = useState<string>("");
  
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newNameValue = e.currentTarget.value;
      setNewToDoItem(newNameValue);
    }
  
    const onClick = () => {
      setToDoList([...toDoList, newToDoItem]);
    }
  
    return (
      <div>
        <h1>To-Do List</h1>
        <input aria-label="todo-input" onChange={value => onNameChange(value)} /> {" "}
        <button onClick={() => onClick()}>Add To-Do Item</button>
        <ul>
          {toDoList.map((name, index) => <li key={index}>{name}</li>)}
        </ul>
      </div>
    );
}