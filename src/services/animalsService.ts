import axios from "axios";
import type {
  Animal,
  AnimalId,
  CreateNewAnimal,
  UpdateAnimalData,
} from "../types/animal";

axios.defaults.baseURL = "https://6994801cfade7a9ec0f59056.mockapi.io/";

export const fetchAnimals = async (
  search: string,
  type: string,
  status: string,
  page: number,
) => {
  const { data } = await axios.get<Animal[]>("/animals", {
    params: {
      search,
      type,
      status,
      limit: 10,
      page,
    },
  });
  return data;
};

export const fetchAnimalById = async (id: AnimalId) => {
  const { data } = await axios.get<Animal>(`/animals/${id}`);
  return data;
};

export const deleteAnimal = async (id: AnimalId) => {
  const { data } = await axios.delete<Animal>(`/animals/${id}`);
  return data;
};

export const addAnimal = async (animal: CreateNewAnimal) => {
  const { data } = await axios.post("/animals", animal);
  return data;
};

export const updateAnimal = async ({
  id,
  ...updateAnimalData
}: UpdateAnimalData) => {
  const { data } = await axios.put<Animal>(`/animals/${id}`, updateAnimalData);
  console.log(data);

  return data;
};
