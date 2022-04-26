import { ToDoListItemProps } from "./ToDoListItemProps";

export const ToDoListItem = ({name, index, handleDeleteItem}: ToDoListItemProps) => {
    return (
        <li>{`${name} `} 
            <button 
                aria-label={`delete-${name}-${index}`} 
                key={`button-${index}`} 
                onClick={() => handleDeleteItem(index)}
            > X </button>
        </li>
    );
};