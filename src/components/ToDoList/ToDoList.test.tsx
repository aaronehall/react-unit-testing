import { render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { ToDoItem } from "../../services/toDoItem";

describe("ToDoList", () => {
    // true unit test
    it("should load list items", async () => {
        // Arrange
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve(toDoItems));

        // Act
        render(<ToDoList />);

        // Assert
        await(waitFor(() => {
            expect(screen.getByText(toDoItems[0].description)).toBeInTheDocument();
        }));

        await (waitFor(() => {
            expect(screen.getByText(toDoItems[1].description)).toBeInTheDocument();
        }));
    })

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {
        // Arrange
        const expectedNewItem = faker.lorem.word();
        jest.spyOn(toDoService, "getToDoList")
            .mockReturnValueOnce(Promise.resolve([])) // initial load
            .mockReturnValueOnce(Promise.resolve([  // when component reloads
                { id: Math.random() * 100, description: expectedNewItem }])); 
        jest.spyOn(toDoService, "addToDoItem").mockReturnValue(Promise.resolve(new Response()));

        // Act
        render(<ToDoList />);

        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, expectedNewItem);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText(expectedNewItem)).toBeInTheDocument();
        });
    });

    // integration test: List component + Delete component
    it("should allow the user to delete an item", async () => {
        // Arrange
        const toDoItems = createToDoItems();
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve(toDoItems));
        const descriptionOfitemToDelete = toDoItems[0].description;
        const indexOfItemToDelete = 0;

        // Act
        render(<ToDoList />);
        userEvent.click(await screen.findByLabelText(`delete-${descriptionOfitemToDelete}-${indexOfItemToDelete}`));

        // Assert
        await waitFor(() => {
            expect(screen.queryByLabelText(`delete-${descriptionOfitemToDelete}-${indexOfItemToDelete}`)).not.toBeInTheDocument()
        });
    });

    it("should display the number of to-do items", async () => {
        // Arrange
        const toDoItems = createToDoItems(2);
        const expectedNewItem = createToDoItems(1)[0];
        jest.spyOn(toDoService, "getToDoList")
            .mockReturnValueOnce(Promise.resolve(toDoItems)) // initial load
            .mockReturnValueOnce(Promise.resolve([...toDoItems, expectedNewItem])); 
        jest.spyOn(toDoService, "addToDoItem").mockReturnValue(Promise.resolve(new Response()));

        // Act
        render(<ToDoList />);

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText("Number of To-Do List items: 2")).toBeInTheDocument();
        });

        // Act
        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, expectedNewItem.description);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText("Number of To-Do List items: 3")).toBeInTheDocument();
        });
    });

    it("should display a message when the to-do list is complete", async () => {
        // Arrange
        const expectedText = "You did everything on your list!";
        const toDoItems = createToDoItems(1);
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve(toDoItems));
        const descriptionOfitemToDelete = toDoItems[0].description;
        const indexOfItemToDelete = 0;

        // Act
        render(<ToDoList />);
        userEvent.click(await screen.findByLabelText(`delete-${descriptionOfitemToDelete}-${indexOfItemToDelete}`));

        // Assert
        await waitFor(async () => {
            expect(await screen.findByText(expectedText)).toBeInTheDocument();
        });
    });

    it("should hide the complete message when the 'OK' button is clicked", async () => {
        // Arrange
        const expectedText = "You did everything on your list!";
        const itemToDelete = createToDoItems(1)[0];
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve([itemToDelete]));
        render(<ToDoList />);

        // Act
        userEvent.click(await screen.findByLabelText(`delete-${itemToDelete.description}-0`));
        userEvent.click(screen.getByRole('button', { name: 'OK' }))

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
        });
    });

    it("should show error text when an empty item is attempted to be added", async () => {
        // Arrange
        const expectedErrorText = "You must enter something";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve(toDoItems));
        render(<ToDoList />);

        // Act
        const input = screen.getByLabelText("todo-input");
        userEvent.paste(input, "");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
        });

        // Act
        userEvent.paste(input, "Something");
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });

    
    it("should show error text when a user attempts to add a duplicate item", async () => {
        // Arrange
        const expectedErrorText = "You already have that on your list";
        const toDoItems = createToDoItems(2);
        jest.spyOn(toDoService, "getToDoList").mockReturnValue(Promise.resolve(toDoItems));
        render(<ToDoList />);

        // Act
        const input = await screen.findByLabelText("todo-input");
        userEvent.paste(input, toDoItems[0].description);
        userEvent.click(screen.getByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
        });

        // Act
        userEvent.paste(input, faker.lorem.word());
        userEvent.click(await screen.findByRole("button", { name: "Add To-Do Item" }));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText(expectedErrorText)).not.toBeInTheDocument();
        });
    });
});

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