import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">

        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="relative mx-auto w-fit">

            <div className="absolute -inset-3 rounded-3xl bg-yellow-400/10 blur-xl" />

            <img
              src="/images/me.jpg"
              alt="Cumar Cabdi Cali"
              className="relative h-80 w-80 rounded-3xl border border-slate-700 object-cover shadow-2xl md:h-96 md:w-96"
            />

          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            About Me
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Cumar Cabdi Cali
          </h1>

          <h2 className="mt-3 text-xl font-semibold text-slate-300">
            Founder & Website Owner
          </h2>

          <div className="mt-6 space-y-4 text-base leading-7 text-slate-400">

            <p>
              My name is <span className="font-semibold text-white">
                Cumar Cabdi Cali
              </span>. I am a web developer and the founder of this
              car marketplace platform.
            </p>

            <p>
              I created this website to make it easier for people to
              <span className="font-semibold text-yellow-400">
                {" "}buy, sell, and rent cars
              </span>
              {" "}through a simple and modern online platform.
            </p>

            <p>
              My goal is to connect car owners and customers in one
              convenient place where users can discover available cars,
              view their details, check prices, and contact sellers
              directly.
            </p>

          </div>

          {/* Skills / Role */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-lg font-bold text-yellow-400">
                Web
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Developer
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-lg font-bold text-yellow-400">
                Car
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Marketplace
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-lg font-bold text-yellow-400">
                Buy & Rent
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Cars
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;