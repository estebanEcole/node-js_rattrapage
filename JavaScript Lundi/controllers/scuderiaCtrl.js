import mongoose from "mongoose";

export const Scuderia = mongoose.model('Scuderia', {
    teamName: String,
    firstPilot: String,
    secondPilot: String,
})
