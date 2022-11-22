import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this?._id }, process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}

export const User = mongoose.model("user", userSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("first Name"),
        lastName: Joi.string().required().label("last Name"),
        email: Joi.string().required().label("email"),
        password: Joi.string().required().label('password')
    });
    return schema.validate(data)
};