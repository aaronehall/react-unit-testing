import faker from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoItem } from "../../services/toDoItem";
import { ToDoListItem } from "./ToDoListItem";
import * as toDoService from "../../services/toDoService";

describe("ToDoListItem", () => {
    it("should allow a user to delete a to-do item", async () => {
        // Arrange
        const item: ToDoItem = { id: Math.random() * 100, description: faker.lorem.word() }
        jest.spyOn(toDoService, "deleteToDoItem").mockImplementation(() => Promise.resolve(new Response()));
        const handleDeleteItemMock = jest.fn();

        render(<ToDoListItem toDoItem={item} handleDelete={handleDeleteItemMock}/>)

        // Act
        fireEvent.click(screen.getByLabelText(`delete-${item.description}-${item.id}`));

        // Assert
        await waitFor(() => {
            expect(handleDeleteItemMock).toBeCalledTimes(1);
        });
    });
});