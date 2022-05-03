import { useEffect, useState } from "react";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export const ToDoList = () => {
    const [toDoList, setToDoList] = useState<string[]>(getToDoList());

    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);

    const handleDeleteItem = (itemIndex: number) => {
        const newToDoList = toDoList.filter((_, index) => index !== itemIndex);
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


    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoList} setToDoList={setToDoList} />
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
            <hr />
            <h3>Number of To-Do List items: {toDoList.length}</h3>
            {shouldShowCompleteMessage && <div>
                <p>You did everything on your list!</p>
                <button onClick={handleCompleteModalClose}>OK</button>
            </div>}
        </>

    );
}