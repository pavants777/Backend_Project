const request = require('supertest');
const app = require('../appRoutes');
const mongoose = require('mongoose');

jest.setTimeout(20000); 


describe('API Testing', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });


    test('Is API running correctly', async () => {
        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);  
        expect(res.body).toHaveProperty("message", "API is running...");
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});