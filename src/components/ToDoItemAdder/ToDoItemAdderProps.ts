import { ToDoItem } from "../../services/toDoItem";

export interface ToDoItemAdderProps {
   toDoList: ToDoItem[];
   handleAdd: () => void;
}