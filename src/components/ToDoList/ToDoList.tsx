import { useState } from "react";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";

export function ToDoList() {
    const [toDoList, setToDoList] = useState<string[]>(getToDoList());
  
    const handleDeleteItem = (itemIndex: number) => {
      const newToDoList = toDoList.filter((_, index) => index !== itemIndex);
      setToDoList(newToDoList);
    }
  
    return (
      <div>
        <h1>To-Do List</h1>
        <ToDoItemAdder handleAddItem={newToDoItem => setToDoList([...toDoList, newToDoItem])}/>
        <ul>
          {toDoList.map((name, index) => 
            <li key={`li-${index}`}>{`${name} `} 
              <button aria-label={`delete-${name}-${index}`} key={`button-${index}`} onClick={() => handleDeleteItem(index)}>X</button>
            </li>)}
        </ul>
      </div>
    );
}