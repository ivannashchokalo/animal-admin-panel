import type { Animal } from "../../types/animal";
import AnimalCard from "../AnimalCard/AnimalCard";
import Grid from "../Grid/Grid";

interface AnimalsListProps {
  animals: Animal[];
}

export default function AnimalsList({ animals }: AnimalsListProps) {
  return (
    <Grid>
      {animals.map((animal) => (
        <AnimalCard key={animal._id} animal={animal} />
      ))}
    </Grid>
  );
}
