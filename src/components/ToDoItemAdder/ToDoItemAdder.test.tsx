import faker from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("ToDoItemAdder", () => {
    it("should allow a user to add a to-do item", async () => {
        const setToDoList = jest.fn();
        const toDoList = ["Take out trash", "Pay rent", "Mow lawn"];

        // Arrange
        render(<ToDoItemAdder toDoList={toDoList} setToDoList={setToDoList} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(screen.getByText("Add To-Do Item"));

        // Assert
        await waitFor(() => {
            expect(setToDoList).toHaveBeenCalledTimes(1);
        });
    });

    it("should not allow a user to add a duplicate to-do item", async () => {
        const existingListItem = faker.lorem.word();
        
        // Arrange
        render(<ToDoItemAdder toDoList={[existingListItem]} setToDoList={jest.fn()} />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, existingListItem);
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