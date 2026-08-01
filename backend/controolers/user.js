

import User from '../modals/user.js';
import bcrypt from 'bcryptjs';

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