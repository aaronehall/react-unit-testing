import { render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../services/toDoItem";

describe("ToDoList", () => {
    // true unit test
    it("should load list items", async () => {

    })

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {

    });

    // integration test: List component + Delete component
    it("should allow the user to delete an item", async () => {

    });

    it("should display the number of to-do items", async () => {

    });

    it("should display a message when the to-do list is complete", async () => {

    });

    it("should hide the complete message when the 'OK' button is clicked", async () => {

    });

    it("should show error text when user attempts to add an empty item", async () => {
        // Arrange
        const expectedErrorText = "You must enter something";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockResolvedValue(toDoItems);
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());
        
        render(<ToDoList />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, "");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        expect(await screen.findByText(expectedErrorText)).toBeInTheDocument();

        // Act
        userEvent.paste(input, "Something");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });

    it("should show error text when a user attempts to add a duplicate item", async () => {
        // Arrange
        const expectedErrorText = "You already have that on your list";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockResolvedValue(toDoItems);
        jest.spyOn(toDoService, "addToDoItem").mockResolvedValue(new Response());
        render(<ToDoList />);

        // Act
        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, toDoItems[0].description);
        userEvent.click(await screen.findByRole("button", { name: "Add To-Do Item" }));

        // Assert
        expect(await screen.findByText(expectedErrorText)).toBeInTheDocument();

        // Act
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(await screen.findByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });
});

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