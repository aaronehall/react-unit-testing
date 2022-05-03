import React, { ChangeEvent, useEffect, useState } from "react";
import { ToDoItemAdderProps } from "./ToDoItemAdderProps";

export const ToDoItemAdder = ({ setToDoList, toDoList }: ToDoItemAdderProps) => {
    const [newToDoItem, setNewToDoItem] = useState<string>("");
    const [shouldShowEmptyErrorText, setShouldShowEmptyErrorText] = useState<boolean>(false);
    const [shouldShowDuplicateErrorText, setShouldShowDuplicateErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItem(newNameValue);
    };

    const handleAddItem = () => {
        if (newToDoItem === "") {
            setShouldShowEmptyErrorText(true);
            return;
        }

        if (toDoList.includes(newToDoItem)) {
            setShouldShowDuplicateErrorText(true);
            return;
        } else {
            setShouldShowDuplicateErrorText(false);
        }

        setToDoList([...toDoList, newToDoItem]);
    }

    useEffect(() => {
        if (shouldShowEmptyErrorText && newToDoItem.length > 0) {
            setShouldShowEmptyErrorText(false);
        }
    }, [newToDoItem])

    return (
        <>
            {shouldShowEmptyErrorText && <p style={{ color: "red" }}>You must enter something</p>}
            {shouldShowDuplicateErrorText && <p style={{ color: "red" }}>You already have that on your list</p>}
            <input aria-label="todo-input" onChange={value => onNameChange(value)} /> {" "}
            <button onClick={handleAddItem}>Add To-Do Item</button>
        </>);
}