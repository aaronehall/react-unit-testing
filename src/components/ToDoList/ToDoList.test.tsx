import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";

describe("ToDoList", () => {
    // true unit test
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

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {
        // Arrange
        const toDoItems = [ faker.lorem.word(), faker.lorem.word() ];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        const expectedNewItem = faker.lorem.word();

        // Act
        render(<ToDoList />);

        const input = screen.getByLabelText("todo-input");
        fireEvent.change(input, { target: { value: expectedNewItem } });
        fireEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText(expectedNewItem)).toBeInTheDocument();
        });
    });

    // integration test: List component + Delete component
    it("should allow the user to delete an item", async () => {
        // Arrange
        const toDoItems = [ faker.lorem.word(), faker.lorem.word() ];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(toDoItems);
        const itemToDelete = toDoItems[0];
        const indexOfItemToDelete = 0;

        // Act
        render(<ToDoList />);
        fireEvent.click(screen.getByLabelText(`delete-${itemToDelete}-${indexOfItemToDelete}`));

        // Assert
        await waitFor(() => {
            expect(screen.queryByLabelText(`delete-${itemToDelete}-${indexOfItemToDelete}`)).not.toBeInTheDocument()
        });
    });
});