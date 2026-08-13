import Car from '../modals/carModel.js';


const createCar = async (req, res) => {
try{
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({
        success: true,
        message: "Car created successfully!",
        data: car,
    });
}catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
}
}


export default createCar;