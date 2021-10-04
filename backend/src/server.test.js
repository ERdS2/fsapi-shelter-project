const mongoose = require("mongoose");
const config = require('config');
const dbConfig = config.get('testDatabase');
const User = require('./models/user.model');
const Pet = require('./models/pet.model')
const Token = require('./models/token.model')
const supertest = require('supertest');
const app = require('./server');
const jwt = require('jsonwebtoken');
require('dotenv').config();


describe("rest api integration test", () => {
    const testUserData = [
        {
            name: "Jani",
            password: "password",
            email: "mail@test.com",
            role: "user"
        },
        {
            name: "Kata",
            password: "adminadmin",
            email: "test@test.com",
            role: "admin"
        }
    ];

    const testPetData = [
        {
            name: "Buksi",
            age: "1év",
            color: "fekete",
            sex: "kandúr",
            breed: "cat",
            story: "asdasdasdasd",
            available: true,
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
        },
        {
            name: "Lilo",
            age: "3év",
            color: "fehér",
            sex: "nőstény",
            breed: "dog",
            story: "asdasdasdasd",
            available: true,
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
        },
        {
            name: "Sanyi",
            age: "5év",
            color: "fekete",
            sex: "kan",
            breed: "dog",
            story: "asdasdasdasd",
            available: true,
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
        }
    ]

    //db connection

    beforeEach((done) => {
        mongoose.connect(`${dbConfig.dbType}${dbConfig.username}${dbConfig.password}${dbConfig.host}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                done();
            })
            .catch(err => {
                process.exit();
            })
    });

    //drop database
    afterAll(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
        })
    });

    //user tests

    test("Post /users", () => {

        const user = {
            name: "Laci",
            password: "password",
            email: "laci@test.com",
        };

        return supertest(app).post('/users')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(201)
            .then(response => {
                const body = response.body._doc;
                expect(body.name).toBe('Laci'),
                    expect(body.email).toBe('laci@test.com')
            });
    });


    //pet tests

    test("POST /pets", () => {

        const token = jwt.sign({
            email: 'admin@mail.com',
            role: 'admin'
        }, process.env.ACCESS_TOKEN_SECRET);

        const pet = {
            name: "Buksika",
            age: "2év",
            color: "fekete",
            sex: "nőstény",
            breed: "cat",
            story: "asdasdasdasd",
            available: true,
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
        };
        return supertest(app).post('/pets')
            .set('authorization', `Bearer ${token}`)
            .send(pet)
            .expect(201)

            .then(response => {
                const body = response.body;
                expect(body.name).toBe('Buksika');
                expect(body.breed).toBe('cat');

            })
    });

    test("GET /pets/:category", () => {

        let category = "dog";

        return Pet.insertMany(testPetData)
            .then(() => {
                return supertest(app).get('/pets/' + category).expect(200)
            })
            .then(response => {
                const body = response.body;

                expect(body.length).toBe(2)
                expect(body[1].name).toBe('Sanyi');
                expect(body[1].breed).toBe('dog');
            })
    });

    //adopt test

    test("POST /adoptation", () => {

        const token = jwt.sign({
            email: 'user@mail.com',
            role: 'user'
        }, process.env.ACCESS_TOKEN_SECRET);


        let petId = '';
        let userId = '';

        return User.insertMany(testUserData)
            .then((savedUserList) => {
                userId = savedUserList[0]._id;

                return Pet.insertMany({
                    name: "Lilo",
                    age: "3év",
                    color: "fehér",
                    sex: "nőstény",
                    breed: "dog",
                    story: "asdasdasdasd",
                    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
                })
            })
            .then((pet) => {
                petId = pet[0]._id;

                return supertest(app).post('/adoption')
                    .set('authorization', `Bearer ${token}`)
                    .send({ _id: petId })
                    .expect(201)
            })
            .then(response => {
                const body = response.body;
                expect(body.pet_id).toBe(petId.toString());
            })


    });

    test('login test', () => {
        return User.insertMany(testUserData)
            .then(savedList => {
                return supertest(app).post('/login').send({
                    inputEmail: 'mail@test.com',
                    inputPassword: 'password'
                })
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                return jwt.verify(response.body.accessToken, process.env.ACCESS_TOKEN_SECRET)
            })
            .then(user => {
                expect(user.role).toBe("user")
                expect(user.email).toBe('mail@test.com')
            })

    });

    test('refresh test', () => {

        const refreshTokenList = [];

        const token = jwt.sign({
            email: 'mail@test.com',
            role: 'user'
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokenList.push({ token });

        return Token.insertMany(refreshTokenList)
            .then(response => {
                return supertest(app).post('/refresh').send({ token: token })
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                const accessTokenInResponse = response.body.accessToken;
                return jwt.verify(accessTokenInResponse, process.env.ACCESS_TOKEN_SECRET)
            })
            .then(user => {
                expect(user.role).toBe("user")
                expect(user.email).toBe('mail@test.com')
            })
    });

    test('logout test', () => {

        const refreshTokenList = [];

        const token = jwt.sign({
            email: 'mail@test.com',
            role: 'user'
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokenList.push({ token });

        return Token.insertMany(refreshTokenList)
            .then(() => {
                return supertest(app).post('/logout')
                    .set({ Authorization: 'Bearer ' + token })
                    .send({ token: token })
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual({});
            })
    });
});

