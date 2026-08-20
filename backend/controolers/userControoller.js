

import User from '../modals/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

   export const Signup = async (req , res)=>{
   try {
     // body kala so bax xogta userka
    const { username , email , password } = req.body;
    //hubi inuu jiro userka
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'User already exists!' });
    }
    //hash garey passwordka
    const hashedPassword = await bcrypt.hash(password , 10);

    //abuur userka cusub
    const newUser = new User ({
        username,
        email,
        password: hashedPassword,
    })

    // save garey userka cusub
    await newUser.save();
    res.status(201).json({
        success: true,
         message: 'User created successfully!' ,
         data : newUser

        });

   }catch(err){

    console.error(err);
    res.status(500).json({ message: 'Server error' });
   }    

}

// login page ,
export const Login = async (req , res)=>{
    try {
        const { email , password } = req.body;  
        if(!email || !password){
            return res.status(400).json({ message: 'Please provide email and password' });
        }    
            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ message: 'User not found' });
            }
            
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch){
                return res.status(400).json({ message: 'Invalid credentials' });
            }   
// 
const token = jwt.sign({
     id: user._id }, 
     process.env.JWT_SECRET,  )
     
res.cookie('access_token' , token , { 
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30,
  path: '/'
});
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data : user,
              
            });


    } catch(err){   
        console.error(err);

        res.status(500).json({ message: 'Server error' });
    }
}



//getUsr 
export const getUsr = async (req , res)=>{
try {
    
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data : user
    });
   
} catch(err){
    console.error(err.message);
   
    res.status(500).json({ message: 'Server error' });
}
}
//updateUsr
