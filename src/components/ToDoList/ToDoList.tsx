import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export const ToDoList = () => {
    const [toDoList, setToDoList] = useState<ToDoItem[]>();
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);

    const handleCompleteModalClose = () => {
        setShouldShowCompleteMessage(false);
    }

    useEffect(() => {
        // TODO: Add loader
        if (fetchToDoItems) {
            getToDoList().then(response => setToDoList(response));
            setFetchToDoItems(false);
        }
    }, [fetchToDoItems]);

    useEffect(() => {
        if (toDoList?.length === 0) {
            setShouldShowCompleteMessage(true)
        }
    }, [toDoList])

    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoList ?? []} handleAdd={() => setFetchToDoItems(true)} />
                <ul>
                    {toDoList?.map((toDoItem, index) =>
                        <ToDoListItem
                            key={index}
                            toDoItem={toDoItem}
                            handleDelete={() => setFetchToDoItems(true)}
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