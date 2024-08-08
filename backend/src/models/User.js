import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3, // Minimum length for security
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Ensures email is stored in lowercase
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    apiKey: {
        type: String,
        unique: true,
    },
    urls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Url",
        },
    ],
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.validatePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
