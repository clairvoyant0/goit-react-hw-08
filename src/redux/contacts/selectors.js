import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

// --------------- Selector`s functions
export const selectContacts = state => {
  return state.contacts.items;
};

export const selectLoader = state => {
  return state.contacts.isLoading;
};

export const selectError = state => {
  return state.contacts.error;
};

export const selectFilteredContacts = createSelector(
  // Масив вхідних селекторів
  [selectContacts, selectNameFilter],
  // Функція перетворювач
  (contacts, filtredValue) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filtredValue.toLowerCase());
    });
  }
);
// ----------------------------------------------------------------------------------/