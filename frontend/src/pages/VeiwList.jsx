import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useAppContext} from "../context/AppContext"
import Contact from "../componets/Contact"
const VeiwList = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
const {currentUser} = useAppContext()
const [showContact, setShowContact] = useState(false)
  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/cars/public/${id}`);
        const data = res.data?.data || res.data;
        setCarData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) getCar();
  }, [id]);

  if (!carData) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <img src={carData.imageURL} alt={carData.name} className="h-80 w-full object-cover" />

        <div className="p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">Featured</p>
              <h1 className="mt-2 text-3xl font-bold">{carData.name}</h1>
            </div>
            <div className="rounded-xl bg-yellow-400 px-4 py-2 text-lg font-bold text-slate-950">
              ${carData.price}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Make</p>
              <p className="mt-1 font-semibold">{carData.make}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Model</p>
              <p className="mt-1 font-semibold">{carData.model}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Year</p>
              <p className="mt-1 font-semibold">{carData.year}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Mileage</p>
              <p className="mt-1 font-semibold">{carData.mileage} km</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Fuel</p>
              <p className="mt-1 font-semibold">{carData.fuelType}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Transmission</p>
              <p className="mt-1 font-semibold">{carData.transmission}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">Description</p>
            <p className="mt-2 leading-7 text-slate-300">{carData.description}</p>
          </div>
        </div>
        
        
      </div>
    
    </div>
  );
};

export default VeiwList;
