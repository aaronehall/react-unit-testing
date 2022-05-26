import { ToDoItem } from "./toDoItem";

export const getToDoList = async (): Promise<ToDoItem[]> => {
    const response = await fetch("https://localhost:7016/todoitems");

    return response.json();
}

// TODO: return value?
export const addToDoItem = async (item: string): Promise<Response> => {
    return await fetch("https://localhost:7016/todoitems", {
        body: JSON.stringify({
            description: item
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }        
    });
}

// TODO: Add DELETE