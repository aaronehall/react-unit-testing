import faker from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../services/toDoItem";
import * as toDoService from "../../services/toDoService";

describe("ToDoItemAdder", () => {
    it("should allow a user to add a to-do item", async () => {
        const handleAddMock = jest.fn();
        jest.spyOn(toDoService, "addToDoItem").mockImplementation(() => Promise.resolve(new Response()));

        // Arrange
        render(<ToDoItemAdder toDoList={createToDoItems(3)} handleAdd={handleAddMock} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(handleAddMock).toHaveBeenCalledTimes(1);
        });
    });

    it("should not allow a user to add a duplicate to-do item", async () => {
        const existingListItem = createToDoItems(1)[0];
        jest.spyOn(toDoService, "addToDoItem").mockImplementation(() => Promise.resolve(new Response()));
        
        // Arrange
        render(<ToDoItemAdder toDoList={[existingListItem]} handleAdd={jest.fn()} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, existingListItem.description);
        userEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText("You already have that on your list")).toBeInTheDocument();
        });

        //Act
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("You already have that on your list")).not.toBeInTheDocument();
        });
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