
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const mongoose = require('mongoose')
const request = supertest(app)

test('GET server health check', async () => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ STATUS: "OK" })
})

describe('TESTING_USER_REGISTER_ROUTE', () => {

    describe('ROUTE_POST_ERROR', () => {

        test('ERROR_Email_Not_Provided', async () => {
            const response = await request.post('/api/user/signup').send({email: "", password: "@abc"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "All fields must be filled"
                })
        })
        test('ERROR_Password_Not_Provided', async () => {
            const response = await request.post('/api/user/signup').send({email: "tester@gmail.com", password: ""})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "All fields must be filled"
                })
        })

        test('ERROR_Password_Not_Strong', async () => {
            const response = await request.post('/api/user/signup').send({email: "tester@gmail.com", password: "@abc"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "Password is not strong"
                })
        })
        test('ERROR_Email_Not_Valid', async () => {
            const response = await request.post('/api/user/signup').send({email: "tester", password: "@Cpduser1"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "Email is not valid"
                })
        })
    })
    describe('ROUTE_POST_OK', () => {
        test('SUCCESS_Signup_OK', async () => {
            const sampleResponse = {email: "", token: ""}
            const response = await request.post('/api/user/signup').send({email: "Jest@gmail.com", password: "@Cpduser1"})
            expect(response.statusCode).toBe(200)

            //Matching email and token keys regardless of values
            expect(Object.keys(response.body)).toMatchObject(Object.keys(sampleResponse))

        })
        test('SUCCESS_Signup_2ndUser_OK', async () => {
            const sampleResponse = {email: "", token: ""}
            const response = await request.post('/api/user/signup').send({email: "Pest@gmail.com", password: "@Cpduser1"})
            expect(response.statusCode).toBe(200)

            //Matching email and token keys regardless of values
            expect(Object.keys(response.body)).toMatchObject(Object.keys(sampleResponse))

        })
        test('ERROR_Email_In_Use', async () => {
            const response = await request.post('/api/user/signup').send({email: "Jest@gmail.com", password: "@Cpduser1"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "Email already in use"
                })
        })
    })
})

describe('TESING_USER_LOGIN_ROUTE', () => {

    describe('ROUTE_POST_ERROR', () => {

        test('ERROR_Email_Not_Provided', async () => {
            const response = await request.post('/api/user/login').send({email: "", password: "@Cpduser1"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "All fields must be filled"
                })
        })
        test('ERROR_Password_Not_Provided', async () => {
            const response = await request.post('/api/user/login').send({email: "Jest@gmail.com", password: ""})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "All fields must be filled"
                })
        })
        test('ERROR_Email_Incorrect', async () => {
            const response = await request.post('/api/user/login').send({email: "EmailThatDoesNotExist@gmail.com", password: "@Cpduser1"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "Incorrect Email"
                })
        })
        test('ERROR_Password_Incorrect', async () => {
            const response = await request.post('/api/user/login').send({email: "Jest@gmail.com", password: "Explicit_wrong_password"})
            expect(response.statusCode).toBe(400)
            expect(response.body).toStrictEqual(
                {
                    "error": "Incorrect Password"
                })
        })
    })
    describe('ROUTE_POST_OK', () => {
        
        test('SUCCESS_Login_OK', async () => {
            const sampleResponse = {email: "", token: "", detailsCompletedStatus: "", prefferedName: ""}
            const response = await request.post('/api/user/login').send({email: "Jest@gmail.com", password: "@Cpduser1"})
            console.log("HERE" + response.request.body)
            console.log("HERE" + response.body.keys)
            expect(response.statusCode).toBe(200)
    
            //Matching email and token keys regardless of values
            expect(Object.keys(response.body)).toMatchObject(Object.keys(sampleResponse))
        })
    })
})


describe('TESTING_USER_DETAILS_CONTROLLER', ()=> {

    beforeEach( async () => {
        const response = await request.post('/api/user/login').send({email: "Jest@gmail.com", password: "@Cpduser1"})
        token = response.body.token
    })
    describe('USER_CPD_POINTS', () => {
        test('GET_User_CPDPoints_AUTH_Error', async () => {
            const response = await request.get('/api/userDetails/');
            expect(response.body).toStrictEqual({error: 'Authorization token required'})
            expect(response.statusCode).toBe(401)
        })
        test('GET_User_CPDPoints_OK', async () => {
            const header = {"Authorization":`Bearer ${token}`}
            const response = await request.get('/api/userDetails/').set(header);
            expect(response.body).toStrictEqual({
                "areaOfPractice": 0,
                "riskManagement": 0,
                "businessAndManagement": 0,
                "careerInterests": 0
            })
            expect(response.statusCode).toBe(200)
        })
        test('PATCH_User_CPDPoints_AUTH_Error', async () => {
            const response = await request.patch('/api/userDetails/').send({
                "areaOfPractice": 10,
                "riskManagement": 10,
                "businessAndManagement": 10,
                "careerInterests": 10
            })
            expect(response.body).toStrictEqual({error: 'Authorization token required'})
            expect(response.statusCode).toBe(401)
        })
        test('PATCH_User_CPDPoints_OK', async () => {
            const header = {"Authorization":`Bearer ${token}`}
            const response = await request.patch('/api/userDetails/').send({
                "areaOfPractice": 10,
                "riskManagement": 10,
                "businessAndManagement": 10,
                "careerInterests": 10
            }).set(header);
            expect(response.body).toStrictEqual({
                "areaOfPractice": 0,
                "riskManagement": 0,
                "businessAndManagement": 0,
                "careerInterests": 0
            })
            expect(response.statusCode).toBe(200)
        })
        test('GET_User_CPDPoints_OK', async () => {
            const header = {"Authorization":`Bearer ${token}`}
            const response = await request.get('/api/userDetails/').set(header);
            expect(response.body).toStrictEqual({
                "areaOfPractice": 10,
                "riskManagement": 10,
                "businessAndManagement": 10,
                "careerInterests": 10
            })
            expect(response.statusCode).toBe(200)
        })
    })

})

afterAll(() => {
    mongoose.connection.dropDatabase()
})

