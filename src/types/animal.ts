export interface Animal {
  id: string;
  name: string;
  type: "dog" | "cat";
  breed: string;
  birthDate: number;
  price: number;
  status: "available" | "reserved" | "sold";
  description: string;
  images: string[];
  createdAt: string;
}

export type CreateNewAnimal = Pick<Animal, "name" | "type" | "breed"> &
  Partial<Omit<Animal, "id" | "createdAt" | "name" | "type" | "breed">>;

export type AnimalId = Animal["id"]; //??????

export type UpdateAnimalData = { id: Animal["id"] } & Partial<
  Omit<Animal, "id" | "createdAt">
>;
