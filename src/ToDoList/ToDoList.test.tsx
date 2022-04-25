import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

describe("ToDoList", () => {
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

    it("should allow the user to add a to-do item", async () => {
        // Arrange
        jest.spyOn(toDoService, "getToDoList").mockReturnValue([]);
        render(<ToDoList />);

        // Act
        const newToDoItem = faker.lorem.word();
        const input = screen.getByLabelText("todo-input");
        fireEvent.change(input, { target: { value: newToDoItem } });
        fireEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(newToDoItem)).toBeInTheDocument();
        });
    });

    it("should allow the user to delete a to-do-item", async () => {
        // Arrange
        const itemToDelete = faker.lorem.word();
        jest.spyOn(toDoService, "getToDoList").mockReturnValue([itemToDelete]);
        render(<ToDoList />);

        // Act
        fireEvent.click(screen.getByLabelText(`delete-${itemToDelete}-0`));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(itemToDelete)).not.toBeInTheDocument();
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
        fireEvent.change(input, { target: { value: newToDoItem } });
        fireEvent.click(screen.getByText("Add To-Do Item"));

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
        fireEvent.click(screen.getByLabelText(`delete-${itemToDelete}-0`));

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
        fireEvent.click(screen.getByLabelText(`delete-${itemToDelete}-0`));
        fireEvent.click(screen.getByRole('button', { name: 'OK' }))

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
        userEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
        });

        // Act
        userEvent.paste(input, "Something");

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });
});