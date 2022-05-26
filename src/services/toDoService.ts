import { ToDoItem } from "./toDoItem";

export const getToDoList = async (): Promise<ToDoItem[]> => {
    const response = await fetch("https://localhost:7016/todoitems");

    return response.json();
}

// TODO: Add POST

// TODO: Add DELETE