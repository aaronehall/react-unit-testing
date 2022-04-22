import { useState } from "react";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export const ToDoList = () => {
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
            <ToDoListItem 
              key={index}
              name={name}
              index={index}
              handleDeleteItem={index => handleDeleteItem(index)}
            />)}
        </ul>
      </div>
    );
}