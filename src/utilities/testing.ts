import * as customQueries from "./testing/queries";
import { render, queries } from "@testing-library/react";
import { ReactElement } from "react";

type CustomQueries = typeof queries & typeof customQueries;

const customRender = (ui: ReactElement, options?: any) =>
  render<CustomQueries, HTMLElement>(ui, {
    queries: {
      ...queries,
      ...customQueries,
    },
    ...options,
  });

export { customRender as render };
