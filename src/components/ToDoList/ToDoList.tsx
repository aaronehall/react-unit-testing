import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export const ToDoList = () => {
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>();
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);

    const handleCompleteModalClose = () => setShouldShowCompleteMessage(false);

    useEffect(() => {
        // TODO: Add loader
        if (fetchToDoItems) {
            // TODO: Handle errors
            getToDoList().then(response => setToDoItems(response));
            setFetchToDoItems(false);
        }
    }, [fetchToDoItems]);

    useEffect(() => {
        if (toDoItems?.length === 0) {
            setShouldShowCompleteMessage(true)
        }
    }, [toDoItems])

    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoItems ?? []} handleAdd={() => setFetchToDoItems(true)} />
                <ul>
                    {toDoItems?.map((toDoItem, index) =>
                        <ToDoListItem
                            key={index}
                            toDoItem={toDoItem}
                            handleDelete={() => setFetchToDoItems(true)}
                        />)}
                </ul>
            </div>
            <hr />
            <h3>Number of To-Do List items: {toDoItems?.length}</h3>
            {shouldShowCompleteMessage && <div>
                <p>You did everything on your list!</p>
                <button onClick={handleCompleteModalClose}>OK</button>
            </div>}
        </>

    );
}