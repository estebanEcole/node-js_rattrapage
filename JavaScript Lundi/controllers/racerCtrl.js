import mongoose from "mongoose";

export const Racer = mongoose.model('Racer', {
    firstName: String,
    lastName: String,
    number: Number,
    team: String,
})