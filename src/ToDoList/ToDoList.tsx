import { ChangeEvent, useEffect, useState } from "react";
import { getToDoList } from "../services/toDoService";

export function ToDoList() {
    const [toDoList, setToDoList] = useState<string[]>(getToDoList());
    const [newToDoItem, setNewToDoItem] = useState<string>("");
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);
    const [shouldShowErrorText, setShouldShowErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItem(newNameValue);
    }

    // TODO: Add validation for duplicates
    const handleAddItem = () => {
        if (newToDoItem === "") {
            setShouldShowErrorText(true)
            return;
        }
        setToDoList([...toDoList, newToDoItem]);
    }

    const handleDeleteItem = (itemName: string) => {
        const newToDoList = toDoList.filter(i => i !== itemName);
        setToDoList(newToDoList);
    }

    const handleCompleteModalClose = () => {
        setShouldShowCompleteMessage(false);
    }

    useEffect(() => {
        if (toDoList.length === 0) {
            setShouldShowCompleteMessage(true)
        }
    }, [toDoList])

    useEffect(() => {
        if (shouldShowErrorText && newToDoItem.length > 0) {
            setShouldShowErrorText(false);
        }
    }, [newToDoItem])

    return (
        <>
            <div>
                <h1>To-Do List</h1>
                {shouldShowErrorText && <p style={{color: "red"}}>You must enter something</p>}
                <input aria-label="todo-input" onChange={value => onNameChange(value)}/> {" "}
                <button onClick={handleAddItem}>Add To-Do Item</button>
                <ul>
                    {toDoList.map((name, index) =>
                        <li key={`li-${index}`}>{`${name} `}
                            <button aria-label={`delete-${name}-${index}`} key={`button-${index}`}
                                    onClick={() => handleDeleteItem(name)}>X
                            </button>
                        </li>)}
                </ul>
                <hr/>
                <h3>Number of To-Do List items: {toDoList.length}</h3>
            </div>

            {shouldShowCompleteMessage && <div>
                <p>You did everything on your list!</p>
                <button onClick={handleCompleteModalClose}>OK</button>
            </div>}
        </>
    );
}