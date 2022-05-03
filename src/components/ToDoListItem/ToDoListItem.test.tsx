import faker from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoListItem } from "./ToDoListItem";

describe("ToDoListItem", () => {
    it("should allow a user to delete a to-do item", async () => {
        // Arrange
        const item = faker.lorem.word();
        const expectedItemIndex = Math.random() * 100;
        let actualItemIndex = 0;
        const handleDeleteItem = jest.fn((_, index) => actualItemIndex = index);

        render(<ToDoListItem name={item} index={expectedItemIndex} handleDeleteItem={itemIndex => handleDeleteItem(item, itemIndex)}/>)

        // Act
        fireEvent.click(screen.getByLabelText(`delete-${item}-${expectedItemIndex}`));

        // Assert
        await waitFor(() => {
            expect(expectedItemIndex).toBe(actualItemIndex);
        });
    });
});