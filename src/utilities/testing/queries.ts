import { buildQueries, queryHelpers } from "@testing-library/dom";

/**
 * Queries for all elements that match a selector.
 *
 * @param container The container element.
 * @param selector  The CSS selector.
 */
export const queryAllBySelector = (container: HTMLElement, selector: string) =>
  Array.from(container.querySelectorAll(selector)) as HTMLElement[];

// Build the remaining queries.
const [
  queryBySelector,
  getAllBySelector,
  getBySelector,
  findAllBySelector,
  findBySelector,
] = buildQueries(
  queryAllBySelector,
  (_, selector) =>
    `Found multiple elements that match the CSS selector: ${selector}`,
  (_, selector) =>
    `Unable to find an element that matches the CSS selector: ${selector}`
);

export {
  getAllBySelector,
  getBySelector,
  findAllBySelector,
  findBySelector,
  queryBySelector,
};
