const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../appRoutes'); 
const User = require('../models/userModel');

jest.setTimeout(50000); 

describe('User Authentication Tests', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }); 
            await User.deleteMany({});
        } catch (error) {
            console.error("Error connecting to database", error);
        }
    });

    test('User SignUp with Valid Data', async () => {
        const res = await request(app)
            .post("/api/signup")
            .send({
                name: "Test User",
                email: "testuser@example.com",
                password: "Test@123",
            });
        expect(res.statusCode).toBe(200); 
        expect(res.body).toHaveProperty("token"); 
        expect(typeof res.body.token).toBe("string"); 
    });

    test('User should not allow duplicate email registration',async ()=>{
        const res = await request(app)
        .post("/api/signup")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "Test@123",
        });

        expect(res.statusCode).toBe(400);
    })

    afterAll(async () => {
        await mongoose.connection.close(); 
    });
});
