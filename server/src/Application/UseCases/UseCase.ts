export interface UseCase<Input, Output> {
  use(input: Input): Promise<Output>;
};