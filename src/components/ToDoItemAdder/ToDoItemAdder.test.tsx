import faker from "@faker-js/faker";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";

describe("ToDoItemAdder", () => {
    it("should allow the user to add a to-do item", async () => {
        let actualNewItem = "";
        const handleAddItem = jest.fn(item => actualNewItem = item);

        // Arrange
        render(<ToDoItemAdder handleAddItem={handleAddItem}/>);

        // Act
        const expectedNewItem = faker.lorem.word();
        const input = screen.getByLabelText("todo-input");
        fireEvent.change(input, { target: { value: expectedNewItem } });
        fireEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(actualNewItem).toBe(expectedNewItem);
        });
    });
})