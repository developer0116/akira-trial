import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatMessage } from "./";
import { Chat } from "types";
const userMessage: Chat = {
  _id: "testid1",
  message: "test message",
  userId: "test1",
  sender: "user",
  created_at: new Date().toISOString(),
};
const botMessage: Chat = {
  _id: "testid1",
  message: "test message",
  actions: ["test action 1", "test action 2"],
  userId: "test1",
  sender: "bot",
  created_at: new Date().toISOString(),
};
describe("ChatMessage", () => {
  it("renders correctly", () => {
    render(
      <ChatMessage
        onEdit={() => {}}
        onDelete={() => {}}
        onClickAction={() => {}}
        data={userMessage}
      />
    );
    const titleElement = screen.getByText(userMessage.message);
    expect(titleElement).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", () => {
    const onEdit = vi.fn();

    render(
      <ChatMessage
        onEdit={onEdit}
        onDelete={() => {}}
        onClickAction={() => {}}
        data={userMessage}
      />
    );

    // Simulate a click event on menu button
    const buttonElement = screen.getByTestId("chat-message-menu");
    fireEvent.click(buttonElement);
    // Simulate a click event on edit button after menu is shown
    const editElement = screen.getByText("Edit");
    fireEvent.click(editElement);

    // Assert that the onEdit function was called once
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when the delete button is clicked", () => {
    const onDelete = vi.fn();

    render(
      <ChatMessage
        onEdit={() => {}}
        onDelete={onDelete}
        onClickAction={() => {}}
        data={userMessage}
      />
    );

    // Simulate a click event on menu button
    const buttonElement = screen.getByTestId("chat-message-menu");
    fireEvent.click(buttonElement);
    // Simulate a click event on delete button after menu is shown
    const deleteElement = screen.getByText("Delete");
    fireEvent.click(deleteElement);

    // Assert that the onDelete function was called once
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
  it("calls onClickAction when an action is clicked", () => {
    const onClickAction = vi.fn();

    render(
      <ChatMessage
        onEdit={() => {}}
        onDelete={() => {}}
        onClickAction={onClickAction}
        data={botMessage}
      />
    );

    // Simulate a click event on action item
    const actionElements = screen.getAllByRole("action");
    expect(actionElements.length).toBe(botMessage.actions!.length);
    fireEvent.click(actionElements[0]);

    // Assert that the onClickAction function was called once
    expect(onClickAction).toHaveBeenCalledTimes(1);
  });
  it("check if menu is show/hidden whenever the menu button is clicked", async () => {
    render(
      <ChatMessage
        onEdit={() => {}}
        onDelete={() => {}}
        onClickAction={() => {}}
        data={userMessage}
      />
    );

    // Asset that the menu is shown after a click event on menu button
    const buttonElement = screen.getByTestId("chat-message-menu");
    fireEvent.click(buttonElement);
    expect(screen.queryByRole("menu")).toBeTruthy();
    // Assert that the menu is hdden after menu button is clicked again
    fireEvent.click(buttonElement);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
