// SampleUser.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI_AUTH; // Assuming this is your MongoDB connection string

const SampleUserSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String
});

const SampleUserModel = mongoose.model("auth", SampleUserSchema);

// Inserting a sample user
const insertSampleUser = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const sampleUser = new SampleUserModel({
            name: "John Doe",
            email: "john@example.com",
            password: "password123"
        });

        await sampleUser.save();
        console.log("Sample user inserted successfully!");
    } catch (error) {
        console.error("Error inserting sample user:", error);
    } finally {
        mongoose.disconnect();
    }
};

insertSampleUser();
