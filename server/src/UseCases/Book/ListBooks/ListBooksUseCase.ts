import type { Book } from "../../../Models/Book";
const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export class ListBooksUseCase {
  public use(): Book[] {
    return books;
  };
};