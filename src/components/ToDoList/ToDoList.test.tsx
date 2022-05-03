import { render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

describe("ToDoList", () => {
    // true unit test
    it("should load list items", () => {
        // Arrange
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);

        // Act
        render(<ToDoList />);

        // Assert
        expect(screen.getByText(toDoItems[0])).toBeInTheDocument();
        expect(screen.getByText(toDoItems[1])).toBeInTheDocument();
    });

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {
        // Arrange
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        const expectedNewItem = faker.lorem.word();

        // Act
        render(<ToDoList />);

        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, expectedNewItem);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText(expectedNewItem)).toBeInTheDocument();
        });
    });

    // integration test: List component + Delete component
    it("should allow the user to delete an item", async () => {
        // Arrange
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        const itemToDelete = toDoItems[0];
        const indexOfItemToDelete = 0;

        // Act
        render(<ToDoList />);
        userEvent.click(screen.getByLabelText(`delete-${itemToDelete}-${indexOfItemToDelete}`));

        // Assert
        await waitFor(() => {
            expect(screen.queryByLabelText(`delete-${itemToDelete}-${indexOfItemToDelete}`)).not.toBeInTheDocument()
        });
    });

    it("should display the number of to-do items", async () => {
        // Arrange
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        render(<ToDoList />);

        expect(screen.getByText("Number of To-Do List items: 2")).toBeInTheDocument();

        // Act
        const newToDoItem = faker.lorem.word();
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, newToDoItem);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.getByText("Number of To-Do List items: 3")).toBeInTheDocument();
        });
    });

    it("should display a message when the to-do list is complete", async () => {
        // Arrange
        const expectedText = "You did everything on your list!";
        const itemToDelete = faker.lorem.word();
        jest.spyOn(toDoService, "getToDoList").mockReturnValue([itemToDelete]);
        render(<ToDoList />);

        // Act
        userEvent.click(screen.getByLabelText(`delete-${itemToDelete}-0`));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
    });

    it("should hide the complete message when the 'OK' button is clicked", async () => {
        // Arrange
        const expectedText = "You did everything on your list!";
        const itemToDelete = faker.lorem.word();
        jest.spyOn(toDoService, "getToDoList").mockReturnValue([itemToDelete]);
        render(<ToDoList />);

        // Act
        userEvent.click(screen.getByLabelText(`delete-${itemToDelete}-0`));
        userEvent.click(screen.getByRole('button', { name: 'OK' }))

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
        });
    });

    it("should show error text when an empty item is attempted to be added", async () => {
        // Arrange
        const expectedErrorText = "You must enter something";
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        render(<ToDoList />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, "");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
        });

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
        const toDoItems = [faker.lorem.word(), faker.lorem.word()];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        render(<ToDoList />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, toDoItems[0]);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
        });
    });
});