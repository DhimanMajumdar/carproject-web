import { useEffect, useState } from "react";
import { fetchCars } from "../../api";
import { Link } from "react-router-dom";

function CarList({ token, searchKeyword }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const { data } = await fetchCars(token);
        setCars(data);
      } catch (error) {
        alert("Error fetching cars");
      }
    };
    loadCars();
  }, [token]);

  // Filter cars whenever searchKeyword or cars change
  useEffect(() => {
    if (!searchKeyword) {
      setFilteredCars(cars); // Show all cars if no search keyword
    } else {
      const lowerKeyword = searchKeyword.toLowerCase();
      const filtered = cars.filter(
        (car) =>
          car.title.toLowerCase().includes(lowerKeyword) ||
          car.description.toLowerCase().includes(lowerKeyword) ||
          car.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
      );
      setFilteredCars(filtered);
    }
  }, [searchKeyword, cars]);

  return (
    <div className="min-h-screen bg-background p-6">
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link
              key={car._id}
              to={`/cars/${car._id}`}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group"
            >
              <img
                src={
                  car.images && car.images.length > 0
                    ? `${process.env.REACT_APP_API_URL}${car.images[0]}`
                    : "placeholder-image-url" // Fallback image
                }
                alt={car.title || "No title available"}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {car.title || "Untitled Car"}
                </h3>
                <p className="text-gray-300 mb-2">
                  {car.description || "No description available"}
                </p>
                <p className="text-sm text-secondary">
                  {car.tags ? car.tags.join(", ") : "No tags available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No cars match your search</p>
      )}
    </div>
  );
}

export default CarList;
