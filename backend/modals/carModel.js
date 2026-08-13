import mongoose from 'mongoose';


const carSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    make:{
        type:String,
        required:true
     },
     model:{
        type:String,
        required:true
       },
       year:{
           type:Number,
           required:true
          },
          price:{
              type:Number,
              required:true
             },
          discount:{
              type:Number,
          },
          offer:{
            type:Boolean,
          },
          mileage:{
              type:Number,
              required:true
             },
             feulType:{
                 type:String,
                 required:true,
                 enum:["petrol","diesel","electric"]
                },
                transmission:{
                    type:String,
                    required:true,
                    enum:["manual","automatic" ,"cvt"]
                   },
                   condition:{
                       type:String,
                       required:true,
                       enum:["new","used","damaged"]
                      },

                      imageURL:{
                          type:String, 
                          required:true
                      },
                      location:{
                          type:String,
                          required:true
                      },
                      type:{
                          type:String,
                          required:true,
                          anum:["sale", "rent"]

                      }

}, {timestamps: true});
const Car = mongoose.model("car", carSchema);
export default Car;