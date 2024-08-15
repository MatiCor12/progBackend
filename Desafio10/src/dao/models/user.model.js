import mongoose from 'mongoose';

//Nombre de la nueva coleccion

const userCollection = 'users';
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    role: { type: String, default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model(userCollection, userSchema);

export default User;