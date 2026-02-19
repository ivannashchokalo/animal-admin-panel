import ResetFiltersBtn from "../ResetFiltersBtn/ResetFiltersBtn";
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
  return (
    <div>
      <SearchBox
        searchText={searchText}
        onSearchChange={onSearchChange}
        onPageChange={onPageChange}
      />
      <TypeFilter type={type} onTypeChange={onTypeChange} />
      <StatusFilter status={status} onStatusChange={onStatusChange} />
      <ResetFiltersBtn
        onSearchChange={onSearchChange}
        onTypeChange={onTypeChange}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
