import { Schema, model } from "mongoose";

//Nombre de la nueva coleccion

const nameCollection = 'User'

const UserSchema = new Schema ({
    name: { type: String, required: [true, 'Name is required']},
    lastName: { type: String, required: [true, 'Last name is mandatory']},
    email: { type: String, required: [true, 'Email is mandatory'], unique: true},
    password: { type: String, required: [true, 'Password is required']},
    rol: { type: String, default: 'user', enum:['user', 'admin']},
    status: { type: Boolean, default: true},
    fechaCreacion: [{type: Date, default: Date.now}],
})

UserSchema.set('toJSON',{
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})
export const userModel= model(nameCollection, UserSchema)