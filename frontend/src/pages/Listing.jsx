import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Listing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listingData, setListingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const getListing = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/auth/listing/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("Cars:", res.data);

                setListingData(res.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch listings"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getListing();
        }
    }, [id]);

    const handleUpdate = (carId) => {
        navigate(`/listing/edit/${carId}`);
    };

    const handleDelete = async (carId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this car?"
        );

        if (!confirmed) return;

        setDeletingId(carId);

        try {
            await axios.delete(
                `http://localhost:8000/api/auth/listing/${carId}`,
                {
                    withCredentials: true,
                }
            );

            setListingData((prev) =>
                prev.filter((car) => car._id !== carId)
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete the car"
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0D12] flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-[#292E3A] border-t-[#F2B705] rounded-full animate-spin" />

                <p className="text-gray-400 text-lg">
                    Loading your cars...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center">
                <p className="text-[#F2B705] text-lg">
                    ⚠ {error}
                </p>
            </div>
        );
    }

    if (!listingData || listingData.length === 0) {
        return (
            <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                    You have no cars listed
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0D12] px-4 sm:px-6 lg:px-8 py-10">

            {/* TITLE */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="border-l-4 border-[#F2B705] pl-4 text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#E9EBF1]">
                    Your Cars
                </h1>

                <p className="text-gray-500 mt-2 ml-5">
                    Manage the cars you have listed for sale.
                </p>
            </div>

            {/* CAR GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {listingData.map((car) => (
                    <div
                        key={car._id}
                        className="bg-[#151821] border border-[#292E3A] rounded-xl overflow-hidden hover:border-[#F2B705] hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >

                        {/* IMAGE */}
                        <div className="relative h-60 bg-[#0B0D12] overflow-hidden">

                            {car.imageURL && (
                                <img
                                    src={car.imageURL}
                                    alt={car.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            )}

                            {/* PRICE */}
                            <div className="absolute left-4 bottom-4 bg-[#F2B705] text-[#211704] px-4 py-2 rounded-lg shadow-xl">
                                <span className="text-xs block font-semibold uppercase">
                                    Price
                                </span>

                                <span className="text-xl font-bold">
                                    ${car.price}
                                </span>
                            </div>

                            {/* TYPE */}
                            <span className="absolute right-4 top-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs uppercase">
                                {car.type}
                            </span>
                        </div>

                        {/* BODY */}
                        <div className="p-6">

                            {/* NAME */}
                            <h2 className="text-2xl font-bold uppercase text-[#E9EBF1] mb-5">
                                {car.name}
                            </h2>

                            {/* SPECS */}
                            <div className="grid grid-cols-2 border border-[#292E3A] rounded-lg overflow-hidden mb-5">

                                <SpecRow
                                    label="Make"
                                    value={car.make}
                                />

                                <SpecRow
                                    label="Model"
                                    value={car.model}
                                />

                                <SpecRow
                                    label="Year"
                                    value={car.year}
                                />

                                <SpecRow
                                    label="Mileage"
                                    value={car.mileage}
                                />

                                <SpecRow
                                    label="Fuel"
                                    value={car.fuelType}
                                />

                                <SpecRow
                                    label="Transmission"
                                    value={car.transmission}
                                />

                                <SpecRow
                                    label="Condition"
                                    value={car.condition}
                                />

                                <SpecRow
                                    label="Discount"
                                    value={
                                        car.discount
                                            ? `${car.discount}%`
                                            : "No discount"
                                    }
                                />

                            </div>

                            {/* DESCRIPTION */}
                            {car.description && (
                                <div className="bg-[#10131A] border-l-2 border-[#292E3A] rounded-md p-4 mb-5">
                                    <p className="text-sm leading-6 text-gray-400">
                                        {car.description}
                                    </p>
                                </div>
                            )}

                            {/* LOCATION */}
                            <div className="flex items-center gap-2 border-b border-[#292E3A] pb-5 mb-5">
                                <span className="w-2 h-2 rounded-full bg-[#F2B705] shadow-[0_0_8px_rgba(242,183,5,0.5)]" />

                                <span className="text-sm text-gray-400">
                                    {car.location}
                                </span>
                            </div>

                            {/* ACTIONS */}
                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    onClick={() =>
                                        handleUpdate(car._id)
                                    }
                                    className="py-2.5 rounded-lg border border-[#F2B705] text-[#F2B705] font-semibold hover:bg-[#F2B705]/10 transition"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(car._id)
                                    }
                                    disabled={
                                        deletingId === car._id
                                    }
                                    className="py-2.5 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {deletingId === car._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SpecRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-3 px-3 py-3 bg-[#151821] border-b border-[#242833] even:bg-[#1A1E27]">
            <span className="text-xs text-gray-500">
                {label}
            </span>

            <span className="text-xs font-semibold text-gray-200 text-right">
                {value || "-"}
            </span>
        </div>
    );
}

export default Listing;