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
