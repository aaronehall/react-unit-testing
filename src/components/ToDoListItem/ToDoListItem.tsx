import { deleteToDoItem } from "../../services/toDoService";
import { ToDoListItemProps } from "./ToDoListItemProps";

export const ToDoListItem = ({toDoItem, handleDelete}: ToDoListItemProps) => {
    const onDelete = (id: number) => {
        deleteToDoItem(id);
        handleDelete();
    };

    return (
        <li>{`${toDoItem.description} `} 
            <button 
                aria-label={`delete-${toDoItem.description}-${toDoItem.id}`} 
                key={`button-${toDoItem.id}`} 
                onClick={() => onDelete(toDoItem.id)}
            > X </button>
        </li>
    );
};