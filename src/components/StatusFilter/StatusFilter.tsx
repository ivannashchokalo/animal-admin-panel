interface StatusFilterProps {
  status: string;
  onStatusChange: (value: string) => void;
}

export default function StatusFilter({
  status,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <select onChange={(e) => onStatusChange(e.target.value)} value={status}>
      <option value="">All</option>
      <option value="available">Available</option>
      <option value="reserved">Reserved</option>
      <option value="sold">Sold</option>
    </select>
  );
}
