export interface Seeder {
  getName(): string;
  seed(): Promise<void>;
};