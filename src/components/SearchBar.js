function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value.trim();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        name="search"
        placeholder="Search cars by title, description, or tags..."
        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
