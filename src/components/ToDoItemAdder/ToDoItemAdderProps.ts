import { ToDoItem } from "../../services/toDoItem";

export interface ToDoItemAdderProps {
   toDoList: ToDoItem[];
   setToDoList: (newToDoList: ToDoItem[]) => void;
}