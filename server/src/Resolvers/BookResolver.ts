import { ListBooksUseCase } from "../UseCases/Book/ListBooks/ListBooksUseCase";

const listBooksUseCase = new ListBooksUseCase();

export const BookResolver = {
  Query: {
    listBooks: listBooksUseCase.use,
  },
};