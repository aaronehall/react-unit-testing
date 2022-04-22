import { useState, ChangeEvent } from "react";
import { getToDoList } from "../../services/toDoService";

export function ToDoList() {
    const [toDoList, setToDoList] = useState<string[]>(getToDoList());
    const [newToDoItem, setNewToDoItem] = useState<string>("");
  
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newNameValue = e.currentTarget.value;
      setNewToDoItem(newNameValue);
    }
  
    const handleAddItem = () => {
      setToDoList([...toDoList, newToDoItem]);
    }

    const handleDeleteItem = (itemIndex: number) => {
      const newToDoList = toDoList.filter((_, index) => index !== itemIndex);
      setToDoList(newToDoList);
    }
  
    return (
      <div>
        <h1>To-Do List</h1>
        <input aria-label="todo-input" onChange={value => onNameChange(value)} /> {" "}
        <button onClick={() => handleAddItem()}>Add To-Do Item</button>
        <ul>
          {toDoList.map((name, index) => 
            <li key={`li-${index}`}>{`${name} `} 
              <button aria-label={`delete-${name}-${index}`} key={`button-${index}`} onClick={() => handleDeleteItem(index)}>X</button>
            </li>)}
        </ul>
      </div>
    );
}