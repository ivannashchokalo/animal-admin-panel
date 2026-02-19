interface ResetFiltersBtnProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function ResetFiltersBtn({
  onSearchChange,
  onStatusChange,
  onTypeChange,
}: ResetFiltersBtnProps) {
  const handleResetFilters = () => {
    onSearchChange("");
    onStatusChange("");
    onTypeChange("");
  };
  return (
    <button type="button" onClick={handleResetFilters}>
      Reset filters
    </button>
  );
}
