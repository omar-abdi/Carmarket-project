import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CarFront,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const [latestCar, setLatestCar] = useState(null);

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

        setLatestCar(cars[1] || null);
      } catch (error) {
        console.error(error);
      }
    };

    getListing();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-10">

          <div className="grid w-full items-center gap-12 lg:grid-cols-2">

            {/* Text */}
            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2">
                <CarFront className="h-4 w-4 text-yellow-400" />

                <span className="text-sm font-medium text-yellow-400">
                  Your Car Marketplace
                </span>
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Find Your
                <span className="block text-yellow-400">
                  Perfect Car
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Buy, sell, or rent cars easily from one modern
                platform. Discover available cars, check their
                details, and contact sellers directly.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/allListing"
                  className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
                >
                  Browse Cars
                  <ArrowRight className="h-4 w-4" />
                </Link>

               

              </div>

            </div>

            {/* Latest Car */}
            <div className="relative">

              {latestCar ? (
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">

                    <img
                      src={latestCar.imageURL}
                      alt={latestCar.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950">
                      Latest Listing
                    </div>

                    <div className="absolute right-4 top-4 rounded-xl bg-black/70 px-4 py-2 text-lg font-bold text-yellow-400 backdrop-blur-md">
                      ${latestCar.price}
                    </div>

                  </div>

                  {/* Car info */}
                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {latestCar.name}
                    </h2>

                    <p className="mt-2 text-slate-400">
                      {latestCar.make} • {latestCar.model}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-slate-950 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">
                            Year
                          </span>
                        </div>

                        <p className="mt-1 font-semibold">
                          {latestCar.year}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Gauge className="h-4 w-4" />
                          <span className="text-xs">
                            Mileage
                          </span>
                        </div>

                        <p className="mt-1 font-semibold">
                          {latestCar.mileage} km
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Fuel className="h-4 w-4" />
                          <span className="text-xs">
                            Fuel
                          </span>
                        </div>

                        <p className="mt-1 font-semibold">
                          {latestCar.fuelType}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs">
                            Location
                          </span>
                        </div>

                        <p className="mt-1 truncate font-semibold">
                          {latestCar.location}
                        </p>
                      </div>

                    </div>

                    <Link
                      to={`/view/${latestCar._id}`}
                      className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
                    >
                      View Latest Car
                    </Link>

                  </div>

                </div>
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">
                  <p className="text-slate-500">
                    Loading latest car...
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-t border-slate-900 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Everything you need for your next car
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Our platform makes it simple to find, sell, and rent
              cars while connecting customers directly with sellers.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <Feature
              icon="🚗"
              title="Buy Cars"
              text="Discover cars for sale, compare their details, prices, and conditions."
            />

            <Feature
              icon="🔑"
              title="Rent Cars"
              text="Find available cars for rent and choose the right car for your needs."
            />

            <Feature
              icon="💰"
              title="Sell Your Car"
              text="List your car and connect directly with people interested in buying."
            />

          </div>

        </div>

      </section>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-yellow-400/40">

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {text}
      </p>

    </div>
  );
}

export default Home;