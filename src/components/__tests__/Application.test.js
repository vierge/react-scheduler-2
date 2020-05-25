import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByTestId,
  getByAltText,
  getByPlaceholderText,
  getByDisplayValue,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    expect(getByText(container, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(container, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the remaining spots by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete this appointment?"
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByAltText(container, "Add"));

    expect(queryByText(container, "no spots remaining")).toBeNull();
    expect(queryByText(container, "Archie Cohen")).toBeNull();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // expect(getByText(container, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByTestId(container, "Monday spots").textContent).toBe(
      "1 spot remaining"
    );
  });

  it("throws a save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"));

    expect(getByText(appointment, "SAVE FAILED")).toBeInTheDocument();
  });

  it("throws a delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(
        appointment,
        "Are you sure you want to delete this appointment?"
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"));

    expect(getByText(appointment, "DELETE FAILED")).toBeInTheDocument();
  });
});
