import { useState, useEffect } from 'react';
import { Trash2, Edit, Car } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useDeleteCar from '../zustand/car';

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { deleteCar, isLoading: isDeleting, error: deleteError } = useDeleteCar();

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cars/all', {
        withCredentials: true
      });
      
      const allCars = response.data.data || [];
      const userId = localStorage.getItem('userId');
      
      const myListings = allCars.filter(car => car.sellerRef === userId);
      setListings(myListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to fetch your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await deleteCar(carId);
      toast.success('Car deleted successfully');
      setListings(listings.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(deleteError || 'Failed to delete car');
    }
  };

  const handleEdit = (carId) => {
    navigate(`/dashboard/updateListing/${carId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <Car size={25} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>
          <p className="mt-2 text-slate-500">Manage your car listings</p>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Car size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold text-slate-700">No listings yet</h3>
            <p className="mt-2 text-slate-500">You haven't created any car listings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-100">
                  {listing.imageURL ? (
                    <img
                      src={listing.imageURL}
                      alt={listing.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Car size={48} className="text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(listing._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      disabled={isDeleting}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{listing.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {listing.make} {listing.model} • {listing.year}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ${listing.price}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {listing.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyListings;
