interface TypeFilterProps {
  type: string;
  onTypeChange: (value: string) => void;
}

export default function TypeFilter({ type, onTypeChange }: TypeFilterProps) {
  return (
    <select onChange={(e) => onTypeChange(e.target.value)} value={type}>
      <option value="">All</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </select>
  );
}
