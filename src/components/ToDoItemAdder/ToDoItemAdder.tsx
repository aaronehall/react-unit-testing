import React, { ChangeEvent, useState } from "react";
import { ToDoItemAdderProps } from "./ToDoItemAdderProps";

export const ToDoItemAdder = ({handleAddItem}: ToDoItemAdderProps) => {
    const [newToDoItem, setNewToDoItem] = useState<string>("");

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItem(newNameValue);
      };

    return (
        <>
            <input aria-label="todo-input" onChange={value => onNameChange(value)} /> {" "}
            <button onClick={() => handleAddItem(newToDoItem)}>Add To-Do Item</button>
        </>);
}