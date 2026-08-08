import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        Unique: true,
    },
    email: {
        type: String,
        required: true,
        Unique: true,
    },
    password: {
        type: String,
        required: true,
    },
  avatar: {
  type: String,
  default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
}
} ,{ timestamps: true });
  


const User = mongoose.model('User', UserSchema);

export default User;