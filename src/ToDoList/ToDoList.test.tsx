import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../services/toDoService";
import { faker } from "@faker-js/faker";

describe("ToDoList", () => {
    it("should load list items", () => {
        // Arrange
        const toDoItems = [ faker.lorem.word(), faker.lorem.word() ];
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
});