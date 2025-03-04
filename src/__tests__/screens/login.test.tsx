import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { Login } from "@/screens/login";
import authReducer, { login } from '@/redux/slices/authSlice';
import { useLoginGoogle } from "@/services/hooks/auth/useLoginGoogle";
import { configureStore } from "@reduxjs/toolkit";
import { Alert } from "react-native";

jest.mock("@/services/hooks/auth/useLoginGoogle");

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const createTestStore = (preloadedState = { auth: { isAuth: false } }) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });


describe("Login Screen", () => {
  it("renders correctly", () => {
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      isSuccess: false,
      isError: false,
      isPending: false,
    });
    const { getByText } = render(
      <Provider store={createTestStore()}>
        <Login />
      </Provider>
    );

    expect(getByText("login.title")).toBeTruthy();
    expect(getByText("login.button")).toBeTruthy();
  });

  it("calls login mutation when button is pressed", async () => {
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      isSuccess: false,
      isError: false,
      isPending: false,
    });

    const { getByText } = render(
      <Provider store={createTestStore()}>
        <Login />
      </Provider>
    );

    const loginButton = getByText("login.button");
    fireEvent.press(loginButton);

    expect(useLoginGoogle().loginMutate).toHaveBeenCalled();
  });

  it("shows loader when login is in progress", () => {
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      isSuccess: false,
      isError: false,
      isPending: true,
    });

    const { getByTestId } = render(
      <Provider store={createTestStore()}>
        <Login />
      </Provider>
    );

    expect(getByTestId("loader")).toBeTruthy();
  });

  it("dispatches login action on success", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      isSuccess: true,
      isError: false,
      isPending: false,
      data: { token: "mock-token" },
    });

    render(
      <Provider store={createTestStore()}>
        <Login />
      </Provider>
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(login());
    });
  });

  it("shows an alert on error", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(() => { });

    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      isSuccess: false,
      isError: true,
      isPending: false,
    });

    render(
      <Provider store={createTestStore()}>
        <Login />
      </Provider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Ocurrio un error");
    });
  });
});
