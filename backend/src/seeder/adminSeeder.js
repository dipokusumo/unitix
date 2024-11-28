require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { mongodbUri } = require('../config/env');

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongodbUri);

        const existingAdmin = await User.findOne({ email: 'admin@unitix.com' });
        if (existingAdmin) {
            console.log('Admin already exists.');
            return process.exit(0);
        }

        const admin = new User({
            name: 'Admin UniTIX',
            email: 'admin@unitix.com',
            password: 'tixinfinity2411',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedDatabase();