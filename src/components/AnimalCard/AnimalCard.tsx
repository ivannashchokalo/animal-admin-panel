import clsx from "clsx";
import type { Animal } from "../../types/animal";
import css from "./AnimalCard.module.css";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalGard({ animal }: AnimalCardProps) {
  return (
    <li>
      <img
        src="https://picsum.photos/id/237/200/300"
        alt={animal.name}
        width={300}
      />
      <div>
        <h2>{animal.name}</h2>
        <p>{animal.type}</p>
        <p>{animal.breed}</p>
        <p>{animal.birthDate}</p>
        <p>{animal.price}</p>
        <span className={clsx(css.badge, css[animal.status])}></span>
      </div>
    </li>
  );
}
