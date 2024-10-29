import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import Login from "../components/auth/login";
// Create a mock store for testing
const createTestStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

describe("Login Component", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  test("renders login form with all input fields", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Check if title is present
    expect(screen.getByText("who are you?")).toBeInTheDocument();

    // Check if all input fields are present
    expect(screen.getByPlaceholderText("i am ...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("my age is ...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("my email is...")).toBeInTheDocument();

    // Check if submit button is present
    expect(screen.getByText("continue")).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText(
      "i am ..."
    ) as HTMLInputElement;
    const ageInput = screen.getByPlaceholderText(
      "my age is ..."
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "my email is..."
    ) as HTMLInputElement;

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "25" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    // Check if inputs have updated values
    expect(nameInput.value).toBe("John Doe");
    expect(ageInput.value).toBe("25");
    expect(emailInput.value).toBe("john@example.com");
  });

  test("dispatches login action on form submission", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText("i am ...");
    const ageInput = screen.getByPlaceholderText("my age is ...");
    const emailInput = screen.getByPlaceholderText("my email is...");
    const submitButton = screen.getByText("continue");

    // Fill in the form
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "25" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if the store was updated correctly
    const state = store.getState();
    expect(state.user.hasInfo).toBe(true);
    expect(state.user.value).toEqual({
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      description: "",
    });
  });

  test("handles empty form submission", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const submitButton = screen.getByText("continue");

    // Submit empty form
    fireEvent.click(submitButton);

    // Check if the store state remains unchanged
    const state = store.getState();
    expect(state.user.hasInfo).toBe(false);
    expect(state.user.value).toEqual({
      name: "",
      age: 0,
      email: "",
      description: "",
    });
  });
});
