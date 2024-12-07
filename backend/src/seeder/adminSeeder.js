require('dotenv').config();
const mongoose = require('mongoose');
const DB = require('../models');
const { mongodbUri } = require('../config/env');

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongodbUri);

        const existingAdmin = await DB.User.findOne({ email: 'admin@unitix.com' });
        if (existingAdmin) {
            console.log('Admin already exists.');
            return process.exit(0);
        }

        const admin = new DB.User({
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