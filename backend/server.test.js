
const app = require('./server') // Link to your server file
const supertest = require('supertest')
const mongoose = require('mongoose')
const request = supertest(app)

test('GET call', async () => {
    const response = await request.get('/')
    // expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ STATUS: "Good to go!" })
})
