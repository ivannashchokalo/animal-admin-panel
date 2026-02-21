import type { Animal } from "../../types/animal";
import AnimalGard from "../AnimalCard/AnimalCard";
import Grid from "../Grid/Grid";

interface AnimalsListProps {
  animals: Animal[];
}

export default function AnimalsList({ animals }: AnimalsListProps) {
  return (
    <Grid>
      {animals.map((animal) => (
        <AnimalGard key={animal.id} animal={animal} />
      ))}
    </Grid>
  );
}
