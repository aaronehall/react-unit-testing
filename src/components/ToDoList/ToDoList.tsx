import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export const ToDoList = () => {
    const [toDoList, setToDoList] = useState<ToDoItem[]>();
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);

    const handleDeleteItem = (itemIndex: number) => {
        const newToDoList = toDoList?.filter((_, index) => index !== itemIndex);
        setToDoList(newToDoList);
    }

    const handleCompleteModalClose = () => {
        setShouldShowCompleteMessage(false);
    }

    useEffect(() => {
        // TODO: Add loader
        getToDoList().then(response => setToDoList(response));
    }, []);

    useEffect(() => {
        if (toDoList?.length === 0) {
            setShouldShowCompleteMessage(true)
        }
    }, [toDoList])

    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoList ?? []} setToDoList={setToDoList} />
                <ul>
                    {toDoList?.map((toDoItem, index) =>
                        <ToDoListItem
                            key={index}
                            name={toDoItem.description}
                            index={index}
                            handleDeleteItem={index => handleDeleteItem(index)}
                        />)}
                </ul>
            </div>
            <hr />
            <h3>Number of To-Do List items: {toDoList?.length}</h3>
            {shouldShowCompleteMessage && <div>
                <p>You did everything on your list!</p>
                <button onClick={handleCompleteModalClose}>OK</button>
            </div>}
        </>

    );
}