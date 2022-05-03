import faker from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { ToDoItemAdder } from "./ToDoItemAdder";
import userEvent from "@testing-library/user-event";

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
})