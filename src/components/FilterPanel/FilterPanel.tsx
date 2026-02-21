import Button from "../Button/ResetFiltersBtn";
import SearchBox from "../SearchBox/SearchBox";
import StatusFilter from "../StatusFilter/StatusFilter";
import TypeFilter from "../TypeFilter/TypeFilter";

interface FilterPanelProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onPageChange: (value: number) => void;
}

export default function FilterPanel({
  searchText,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onPageChange,
}: FilterPanelProps) {
  const handleResetFilters = () => {
    onSearchChange("");
    onStatusChange("");
    onTypeChange("");
    onPageChange(1);
  };

  return (
    <div>
      <SearchBox
        searchText={searchText}
        onSearchChange={onSearchChange}
        onPageChange={onPageChange}
      />
      <TypeFilter type={type} onTypeChange={onTypeChange} />
      <StatusFilter status={status} onStatusChange={onStatusChange} />
      <Button type={"button"} onClick={handleResetFilters}>
        Reset filters
      </Button>
    </div>
  );
}
