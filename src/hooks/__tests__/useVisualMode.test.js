import React from 'react'

import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";


const FIRST = "FIRST"
const SECOND = "SECOND"
const THIRD = "THIRD"

test("useVisualMode should init with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});
test("useVisualMode should update state when fed a value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND))
  expect(result.current.mode).toBe(SECOND);
})
test("useVisualMode should be able to return to a previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND))
  expect(result.current.mode).toBe(SECOND)
  act(() => result.current.transition(THIRD))
  expect(result.current.mode).toBe(THIRD)
  act(() => result.current.back())
  expect(result.current.mode).toBe(SECOND)
  act(() => result.current.back())
  expect(result.current.mode).toBe(FIRST)
})
test("useVisualMode should remain at the current mode if there is no previous history", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.back())
  expect(result.current.mode).toBe(FIRST);
})
test("useVisualMode should allow us to replace the current value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
})