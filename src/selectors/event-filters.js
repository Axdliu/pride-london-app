// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { State } from "../reducers";

const getEventFiltersState = (state: State, selectStagedFilters: boolean) =>
  selectStagedFilters
    ? state.eventFilters.stagedFilters
    : state.eventFilters.selectedFilters;

export const selectDateFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => getEventFiltersState(state, selectStagedFilters).date;
export const selectTimeFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => getEventFiltersState(state, selectStagedFilters).time;

const buildDateOrDateRangeFilter = (date: DateOrDateRange) =>
  typeof date === "string" ? buildDateFilter(date) : buildDateRangeFilter(date);

const buildTimesFilter = (times: Time[]) => {
  const filters = times.map(time => buildTimeFilter(time));
  return (event: Event) => filters.some(filter => filter(event));
};

export const buildEventFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => {
  const { date, time, categories } = getEventFiltersState(
    state,
    selectStagedFilters
  );
  const timeArray = Array.from(time);
  const categoriesArray = Array.from(categories);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateOrDateRangeFilter(date)
    : () => true;
  const timeFilter: (event: Event) => boolean =
    timeArray.length > 0 && timeArray.length < 3
      ? buildTimesFilter(timeArray)
      : () => true;
  const categoryFilter: (event: Event) => boolean =
    categoriesArray.length > 0
      ? buildCategoryFilter(categoriesArray)
      : () => true;

  return (event: Event) =>
    dateFilter(event) && timeFilter(event) && categoryFilter(event);
};
