import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
