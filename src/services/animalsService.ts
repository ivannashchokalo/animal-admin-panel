import axios from "axios";
import type { Animal } from "../types/animal";

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
