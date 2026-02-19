import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAnimals } from "../../services/animalsService";
import AnimalsList from "../../components/AnimalsList/AnimalsList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ReactPaginate from "react-paginate";
import css from "./Animals.module.css";

export default function Animals() {
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSetSearchText = useDebouncedCallback(setSearchText, 300);

  const totalPage = 2;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["animals", searchText, type, status, page],
    queryFn: () => fetchAnimals(searchText, type, status, page),
    placeholderData: keepPreviousData,
  });
  return (
    <main>
      <FilterPanel
        searchText={searchText}
        onSearchChange={debouncedSetSearchText}
        type={type}
        onTypeChange={setType}
        status={status}
        onStatusChange={setStatus}
        onPageChange={setPage}
      />
      {isLoading && <strong>Loading...</strong>}
      {isError && <strong>Something went wrong</strong>}
      {data && data.length > 0 && <AnimalsList animals={data} />}
      <ReactPaginate
        pageCount={totalPage}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        previousLabel="←"
        nextLabel="→"
        breakLabel="..."
        renderOnZeroPageCount={null}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    </main>
  );
}
