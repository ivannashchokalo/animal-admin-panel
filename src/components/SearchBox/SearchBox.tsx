export default function SearchBox({ onSearch }) {
  const handleSubmit = (formData: FormData) => {
    const value = formData.get("search") as string;
    onSearch((prev) => {
      const params = new URLSearchParams(prev);
      params.set("search", `${value}`);
      return params;
    });
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="search" />
      <button>Search</button>
    </form>
  );
}
