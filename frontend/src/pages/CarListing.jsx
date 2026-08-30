import {
  Car,
  Image,
  MapPin,
  DollarSign,
  Gauge,
  CalendarDays,
} from "lucide-react";
import {useState, useRef} from 'react'
import axios from 'axios'
import {toast , ToastContainer} from 'react-toastify'
import {useAppContext} from '../context/AppContext.jsx'

function Carlisting() {
  const {currentUser} = useAppContext();
    const fileInput = useRef(null);
    const [image, setImage] = useState("")
    const [uploadError, setUploadError] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [listingData, setListingData] = useState({
      name:"",
      make:"",
      model:"",
      year:"2000",
      mileage:"0",
      description:"",
      fuelType:"petrol",
      transmission:"automatic",
      condition:"new",
      type:"sale",
      sellerRef:currentUser._id,
      price:"0",
      discount:"0",
      offer:false,
      location:"",
      imageURL:"",
      owner: currentUser.username
    })

  const handleChangeData = (e) => {
    const { name, value, type, checked } = e.target;
    const nextState = {
      ...listingData,
      [name]: type === "checkbox" ? checked : value,
    };

    console.log("listingData:", nextState);
    setListingData(nextState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...listingData,
        type: listingData.type === "rent" ? "rent" : "sale",
        offer: Boolean(listingData.offer),
        imageURL: image || listingData.imageURL,
      };

      console.log("payload:", payload);

      const res= await axios.post("http://localhost:8000/api/cars/create", payload, {
        withCredentials: true,
      });

const data =   await res.data
if(data.success){
  toast.success(data.message)
  setListingData({
    name:"",
    make:"",
    model:"",
    year:"2000",
    mileage:"0",
    description:"",
    fuelType:"petrol",
    transmission:"automatic",
    condition:"new",
    type:"sale",
    price:"0",
    discount:"0",
    offer:false,
    location:"",
    imageURL:""
  })
  setImage("");
  setUploadError(null);
}else{
  toast.error(data.message)
}
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register car");
    }
  };

   const handleChangeFile = async (e) => {
     const file = e.target.files?.[0];

     if (!file) {
       return;
     }

     setUploading(true);
     setUploadError(null);
     toast.info("Uploading...");

     try {
       const data = new FormData();
       data.append("file", file);
       data.append("upload_preset", "upload_preset");
       data.append("api_key", import.meta.env.CLOUDINARY_API_KEY || import.meta.env.CLOUDINARY_API);

       const response = await fetch(
         "https://api.cloudinary.com/v1_1/douofotna/image/upload",
         {
           method: "POST",
           body: data,
         }
       );

       const result = await response.json();
       const uploadedUrl = result?.secure_url || result?.url || "";

       setImage(uploadedUrl);
       setListingData((prev) => ({ ...prev, imageURL: uploadedUrl }));
       toast.success("Image uploaded successfully");
     } catch (error) {
       setUploadError(error.message || "Image upload failed");
       toast.error("Image upload failed");
     } finally {
       setUploading(false);
     }
   };

 
console.log(listingData)
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <Car size={25} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Register Your Car
          </h1>

          <p className="mt-2 text-slate-500">
            Add your vehicle details and make it available for sale or rent.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" >

          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the main information about your vehicle.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Car Name
              </label>

              <input
                type="text"
                name="name"
                value={listingData.name}
                onChange={handleChangeData}
                placeholder="e.g. Toyota Corolla"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Make */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Make
              </label>

              <input
                type="text"
                name="make"
                value={listingData.make}
                onChange={handleChangeData}
                placeholder="e.g. Toyota"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Model */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Model
              </label>

              <input
                type="text"
                name="model"
                value={listingData.model}
                onChange={handleChangeData}
                placeholder="e.g. Corolla"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Year */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Year
              </label>

              <div className="relative">
                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="year"
                  value={listingData.year}
                  onChange={handleChangeData}
                  placeholder="2024"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Mileage */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mileage (km)
              </label>

              <div className="relative">
                <Gauge
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="mileage"
                  value={listingData.mileage} 
                  onChange={handleChangeData}
                  placeholder="35000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

          </div>


          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={listingData.description}
              onChange={handleChangeData}
              placeholder="Describe your car..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>


          {/* Vehicle Details */}
          <div className="mb-6 mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Vehicle Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the specifications of your vehicle.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Fuel */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Fuel Type
              </label>

              <select 
              name="fuelType"
              value={listingData.fuelType}
              onChange={handleChangeData}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500">
                <option value="">Select fuel type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transmission
              </label>

              <select 
              name="transmission"
              value={listingData.transmission}
              onChange={handleChangeData}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500">
                <option value="">Select transmission</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="cvt">CVT</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Condition
              </label>

              <select 
              name="condition"
              value={listingData.condition} 
              onChange={handleChangeData}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-blue-500">
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Listing Type
              </label>

              <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="radio"
                    name="type"
                    value="sale"
                    checked={listingData.type === "sale"}
                    onChange={handleChangeData}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Sale
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="radio"
                    name="type"
                    value="rent"
                    checked={listingData.type === "rent"}
                    onChange={handleChangeData}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Rent
                </label>
              </div>
            </div>

          </div>


          {/* Pricing */}
          <div className="mb-6 mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Pricing
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Set the price and any available discount.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price
              </label>

              <div className="relative">
                <DollarSign
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="price"
                  value={listingData.price} 
                  onChange={handleChangeData}
                  placeholder="25000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Discount
              </label>

              <div className="relative">
                <DollarSign
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="discount"
                  value={listingData.discount}  
                  onChange={handleChangeData}
                  placeholder="2000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

          </div>


          {/* Offer */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-800">
                Special Offer
              </p>

              <p className="text-sm text-slate-500">
                Mark this car as a special offer.
              </p>
            </div>

            <input
              type="checkbox"
              name="offer"
              checked={listingData.offer}
              onChange={handleChangeData}
              className="h-5 w-5 accent-blue-600"
            />
          </div>


          {/* Location */}
          <div className="mb-6 mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Location
            </h2>
          </div>

          <div className="relative">
            <MapPin
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="location"
              value={listingData.location}
              onChange={handleChangeData}
              placeholder="e.g. Mogadishu"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>


          {/* Image */}
          <div className="mb-6 mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Car Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a clear image of your vehicle.
            </p>
          </div>

          <div
            onClick={() => fileInput.current?.click()}
            className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50/30"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Image size={27} />
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              Upload car image
            </p>

            <p className="mt-1 text-sm text-slate-400">
              PNG, JPG or JPEG
            </p>

            <input
              onChange={handleChangeFile}
              type="file"
              ref={fileInput}
              accept="image/png,image/jpeg,image/jpg"
              hidden
              className="mt-4 text-sm text-slate-500"
            />

            {uploading && <p className="mt-3 text-sm text-blue-600">Uploading image...</p>}
            {uploadError && <p className="mt-3 text-sm text-red-500">{uploadError}</p>}
            {image && <img src={image} alt="Car preview" className="mt-4 h-32 w-full rounded-xl object-cover" />}
          </div>


          {/* Buttons */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Register Car
            </button>

          </div>

        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Carlisting;