import faker from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../services/toDoItem";
import * as toDoService from "../../services/toDoService";

describe("ToDoItemAdder", () => {
    it("should allow a user to add a to-do item", async () => {

    });

    it("should not allow a user to add a duplicate to-do item", async () => {

    });
})

export const createToDoItems = (numberToCreate: number = 3): ToDoItem[] => {
    let items = [];

    for (let i = 0; i < numberToCreate; i++) {
        items.push({
            id: i,
            description: faker.lorem.word()
        })
    }

    return items;
}