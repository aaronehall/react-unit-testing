import { ToDoItem } from "../../services/toDoItem";

export interface ToDoListItemProps {
    toDoItem: ToDoItem;
    handleDelete: () => void;
}