import clsx from "clsx";
import type { Animal } from "../../types/animal";
import css from "./AnimalCard.module.css";
import { Link } from "react-router";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalGard({ animal }: AnimalCardProps) {
  return (
    <li>
      <Link to={`/animals/${animal.id}`}>
        <img
          // src={animal.images[0]}
          src="https://picsum.photos/id/237/200/300"
          alt={animal.name}
          width={300}
        />
        <div>
          <h2>{animal.name}</h2>
          <p>{animal.breed}</p>
          <p>{animal.price}</p>
          <span className={clsx(css.badge, css[animal.status])}></span>
        </div>
      </Link>
    </li>
  );
}
