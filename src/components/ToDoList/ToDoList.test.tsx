import { render, screen, waitFor } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import * as toDoService from "../../services/toDoService";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

describe("ToDoList", () => {
    // true unit test
    it("should load list items", () => {

    });

    // integration test: List component + Add component
    it("should allow the user to add an item", async () => {

    });

    // integration test: List component + Delete component
    it("should allow the user to delete an item", async () => {

    });

    it("should display the number of to-do items", async () => {

    });

    it("should display a message when the to-do list is complete", async () => {

    });

    it("should hide the complete message when the 'OK' button is clicked", async () => {

    });

    it("should show error text when an empty item is attempted to be added", async () => {

    });
});