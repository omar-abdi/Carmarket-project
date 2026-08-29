import Car from '../modals/carModel.js';
import User from '../modals/userModel.js';

const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({
      success: true,
      message: "Car created successfully!",
      data: car,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export default createCar;

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (req.user.id !== String(car.sellerRef)) {
      return res.status(403).json({
        message: "You are not authorized to view this car",
      });
    }

    return res.status(200).json({
      success: true,
      data: car,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getCarByIdPublic = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

   

    return res.status(200).json({
      success: true,
      data: car,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (req.user.id !== String(car.sellerRef)) {
      return res.status(403).json({ message: "You are not authorized to update this car" });
    }

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      discount: req.body.discount,
      offer: req.body.offer,
      mileage: req.body.mileage,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission,
      condition: req.body.condition,
      imageURL: req.body.imageURL,
      location: req.body.location,
      sellerRef: req.body.sellerRef,
      type: req.body.type,
    };

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Car updated successfully!",
      data: updatedCar,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    const carsWithSeller = await Promise.all(
      cars.map(async (car) => {
        const user = await User.findById(car.sellerRef).select("username");

        return {
          ...car.toObject(),
          sellerName: user?.username || "Unknown seller",
        };
      })
    );

    res.status(200).json({
      data: carsWithSeller,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


