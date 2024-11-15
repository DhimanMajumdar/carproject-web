import { useEffect, useState } from "react";
import { fetchCars } from "../../api";
import { Link } from "react-router-dom";

function CarList({ token, searchKeyword }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const { data } = await fetchCars(token, searchKeyword);
        setCars(data);
      } catch (error) {
        alert("Error fetching cars");
      }
    };
    loadCars();
  }, [token, searchKeyword]);

  return (
    <div className="min-h-screen bg-background p-6">
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link
              key={car._id}
              to={`/cars/${car._id}`} // Navigates to CarDetailPage with car ID
              className="relative bg-white shadow-md rounded-lg overflow-hidden group"
            >
              <img
                src={
                  car.images[0]
                    ? `http://localhost:5000${car.images[0]}`
                    : "placeholder-image-url"
                }
                alt={car.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <p className="text-gray-300 mb-2">{car.description}</p>
                <p className="text-sm text-secondary">{car.tags.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No cars found</p>
      )}
    </div>
  );
}

export default CarList;
