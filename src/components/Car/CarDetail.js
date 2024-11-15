// import React, { useEffect, useState } from 'react';
// import { fetchCarById, deleteCar } from '../../api';

// function CarDetail({ carId, token }) {
//   const [car, setCar] = useState(null);

//   useEffect(() => {
//     const loadCar = async () => {
//       try {
//         const { data } = await fetchCarById(carId, token);
//         setCar(data);
//       } catch (error) {
//         alert('Error fetching car details');
//       }
//     };
//     loadCar();
//   }, [carId, token]);

//   const handleDelete = async () => {
//     try {
//       await deleteCar(carId, token);
//       alert('Car deleted successfully!');
//     } catch (error) {
//       alert('Error deleting car');
//     }
//   };

//   return car ? (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="max-w-xl bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-primary">{car.title}</h2>
//         <p className="text-gray-600 mt-2">{car.description}</p>
//         <p className="text-gray-500 mt-2">
//           Tags: <span className="text-secondary">{car.tags.join(', ')}</span>
//         </p>
//         <button
//           onClick={handleDelete}
//           className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   ) : (
//     <p>Loading...</p>
//   );
// }

// export default CarDetail;
