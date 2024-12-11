require('dotenv').config();
const mongoose = require('mongoose');
const DB = require('../models');
const { mongodbUri } = require('../config/env');

const seedAdmin = async () => {
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

const seedEvents = async () => {
    try {
        await mongoose.connect(mongodbUri);

        const now = new Date();
        const events = [
            {
                name: "Music Festival Jakarta",
                dateTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                location: "Jakarta",
                description: "Enjoy live performances from top artists in Jakarta.",
                quota: 500,
                ticketPrice: 50000,
                posterUrl: "https://example.com/poster1.jpg",
                eventBy: "Live Nation"
            },
            {
                name: "Bali Art Showcase",
                dateTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                location: "Bali",
                description: "A grand exhibition of local artists in Bali.",
                quota: 300,
                ticketPrice: 75000,
                posterUrl: "https://example.com/poster2.jpg",
                eventBy: "Bali Arts Community"
            },
            {
                name: "Tech Conference 2024",
                dateTime: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
                location: "Bandung",
                description: "Meet industry leaders and discuss the future of technology.",
                quota: 1000,
                ticketPrice: 200000,
                posterUrl: "https://example.com/poster3.jpg",
                eventBy: "Tech Corp"
            },
            {
                name: "Yogyakarta Food Festival",
                dateTime: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                location: "Yogyakarta",
                description: "Taste the best traditional dishes from Yogyakarta.",
                quota: 400,
                ticketPrice: 30000,
                posterUrl: "https://example.com/poster4.jpg",
                eventBy: "Yogyakarta Culinary"
            },
            {
                name: "Surabaya Marathon",
                dateTime: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
                location: "Surabaya",
                description: "Join thousands of runners in Surabaya's annual marathon.",
                quota: 800,
                ticketPrice: 100000,
                posterUrl: "https://example.com/poster5.jpg",
                eventBy: "Run Surabaya"
            },
            {
                name: "Jakarta Jazz Night",
                dateTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
                location: "Jakarta",
                description: "An evening of soulful jazz music.",
                quota: 350,
                ticketPrice: 75000,
                posterUrl: "https://example.com/poster6.jpg",
                eventBy: "Jazz Enthusiasts"
            },
            {
                name: "Startup Meetup",
                dateTime: new Date(now.getTime() + 50 * 24 * 60 * 60 * 1000),
                location: "Medan",
                description: "Connect with like-minded entrepreneurs in Medan.",
                quota: 200,
                ticketPrice: 50000,
                posterUrl: "https://example.com/poster7.jpg",
                eventBy: "Medan Startup Hub"
            },
            {
                name: "Anime Expo Indonesia",
                dateTime: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
                location: "Jakarta",
                description: "Celebrate Japanese pop culture at Anime Expo Indonesia.",
                quota: 600,
                ticketPrice: 120000,
                posterUrl: "https://example.com/poster8.jpg",
                eventBy: "Otaku Society"
            },
            {
                name: "Nature Photography Workshop",
                dateTime: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
                location: "Bogor",
                description: "Learn tips and tricks from professional photographers.",
                quota: 150,
                ticketPrice: 70000,
                posterUrl: "https://example.com/poster9.jpg",
                eventBy: "Photo Studio"
            },
            {
                name: "Coding Hackathon",
                dateTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
                location: "Jakarta",
                description: "A 24-hour coding competition for developers.",
                quota: 100,
                ticketPrice: 0,
                posterUrl: "https://example.com/poster10.jpg",
                eventBy: "Techies"
            }
        ];

        await DB.Event.insertMany(events);
        console.log('10 events seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
};

seedAdmin();
seedEvents();