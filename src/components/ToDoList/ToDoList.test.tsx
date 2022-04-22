import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
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
});