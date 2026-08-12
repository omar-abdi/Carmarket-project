import jwt from "jsonwebtoken";


export const protectRoute = async (req, res, next) => {

        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized",
            });
        }

        jwt.verify(token, process.env.JWT_SECRET , (error , user)=>{
            if(error) return next (errorHandler(404 ,"forbidden"))
                  req.user = user;


              next();

        })
        

       

      

      

  
};