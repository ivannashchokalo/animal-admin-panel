interface SearchBoxProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onPageChange: (value: number) => void;
}

export default function SearchBox({
  searchText,
  onSearchChange,
  onPageChange,
}: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPageChange(1);
    onSearchChange(e.target.value);
  };
  return (
    <input type="text" onChange={handleChange} defaultValue={searchText} />
  );
}
