import { useState, useEffect } from "react";

import {
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Settings2,
  CarFront,
  UserRound,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios"
import {useAppContext} from "../context/AppContext"  
import Contact from "../componets/Contact"

function AllListing() {
  const [listing, setListing] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const {currentUser} = useAppContext()
const [showContact, setShowContact] = useState(false)
  const filteredListing = listing.filter((car) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    return [car.name, car.make, car.model]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/cars/all"
        );

        const cars = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

       
        setListing(cars);
      } catch (error) {
        console.error(error);
      }
    };

    getListing();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white md:px-10">
      
      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10">
            <CarFront className="h-6 w-6 text-yellow-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              All Listings
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Discover available cars from our sellers
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {filteredListing.length} {filteredListing.length === 1 ? "car" : "cars"} found
          </p>

          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only text-white font-bold">Search cars by name</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search car name..."
              className="bg-white w-full text-black    rounded-xl border border-slate-800  py-3 pl-11 pr-4 text-lg outline-none transition placeholder focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
            />
          </label>
        </div>
      </div>

      {/* Listings */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredListing.map((car) => (
          <div
            key={car._id}
            className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-yellow-500/50"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-slate-800">
              <img
                src={car.imageURL}
                alt={car.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Price */}
              <div className="absolute right-3 top-3 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-bold text-slate-950 shadow-lg">
               price  ${car.price}
              </div>

              {/* Type */}
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              type   {car.type}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">

              {/* Seller */}
              <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-yellow-400" />

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                      Owner
                    </p>

                    <p className="max-w-[190px] truncate text-xs font-semibold text-yellow-400">
                    
                    </p>
                  </div>
                </div>
              </div>

              {/* Car Name */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">
                Name  {car.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                make  {car.make} • model  {car.model}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2">
                
                <Spec
                  icon={<Calendar />}
                  label="Year"
                year  value={car.year}
                />

                <Spec
                  icon={<Gauge />}
                  label="Mileage"
                  value={`${car.mileage} km`}
                />

                <Spec
                  icon={<Fuel />}
                  label="Fuel"
               fuelType  value={car.fuelType}
                />

                <Spec
                  icon={<Settings2 />}
                  label="Transmission"
                  value={car.transmission}
                />
              </div>

              {/* Condition */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-xs text-white">
                  Condition
                </span>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                  {car.condition}
                </span>
              </div>

              {/* Location */}
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-yellow-400" />

                <span className="truncate">
                  {car.location}
                </span>
              </div>

              {/* Description */}
              {car.description && (
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                  {car.description}
                </p>
              )}

              {/* Button */}
              <Link
                to={`/view/${car._id}`}
                className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-[0.98]"
              >
                View Details
              </Link>
              {currentUser && currentUser._id !== car.sellerRef && <button  onClick={()=>setShowContact(true)}
              className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-[0.98]">Contact Seller</button>}
{showContact && <Contact car ={car._id}/>}
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {filteredListing.length === 0 && (
        <div className="mx-auto mt-20 max-w-md text-center">
          <CarFront className="mx-auto mb-4 h-12 w-12 text-slate-700" />

          <h2 className="text-xl font-semibold text-slate-300">
            {searchTerm ? "No matching cars found" : "No listings available"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {searchTerm
              ? "Try another car name, make, or model."
              : "There are currently no cars listed for sale."}
          </p>
        </div>
      )}
    </div>
  );
}


/* Specification Component */
function Spec({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <div className="mb-1 flex items-center gap-2 text-slate-500">
        <span className="h-3.5 w-3.5 [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>

        <span className="text-[10px] uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="truncate text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default AllListing;