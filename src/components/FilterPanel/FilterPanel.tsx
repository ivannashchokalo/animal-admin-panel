import SearchBox from "../SearchBox/SearchBox";
import StatusFilter from "../StatusFilter/StatusFilter";
import TypeFilter from "../TypeFilter/TypeFilter";

interface FilterPanelProps {
  search: string;
  // onSearch: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onPageChange: (value: number) => void;
}

export default function FilterPanel({
  onSearch,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onPageChange,
}: FilterPanelProps) {
  return (
    <div>
      <SearchBox onSearch={onSearch} onPageChange={onPageChange} />
      <TypeFilter type={type} onTypeChange={onTypeChange} />
      <StatusFilter status={status} onStatusChange={onStatusChange} />
    </div>
  );
}
