import "@testing-library/jest-dom/vitest"
import { expect, test } from "vitest"

import { render, screen } from "@/config/testingLibrary"
import RootPage from "./page"

test("トップページがが正常に表示されること", async () => {
  render(await RootPage())
  expect(await screen.findByTestId("home-articles")).toBeInTheDocument()
})
