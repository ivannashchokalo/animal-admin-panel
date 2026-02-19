import type { Animal } from "../../types/animal";
import AnimalGard from "../AnimalCard/AnimalCard";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";

interface AnimalsListProps {
  animals: Animal[];
}

export default function AnimalsList({ animals }: AnimalsListProps) {
  return (
    <Grid>
      {animals.map((animal) => (
        <GridItem key={animal.id}>
          <AnimalGard animal={animal} />
        </GridItem>
      ))}
    </Grid>
  );
}
