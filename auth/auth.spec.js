const request = require('supertest');
const Users = require('../users/users-model')
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs');
const server = require('../api/server.js');



//how to check a value on the environment: 

//process.env.Node_ENV

describe('users model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })


    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('insert()', () => {
        it('should insert user record into the db', async () => {
            //insert a record
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2), department: 'video games'},
            );

            let users = await db('users')

            //assert the record was inserted
            expect(users).toHaveLength(1)
        })

        it('should insert user record into the db', async () => {
            //insert a record
            let { id } = await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2), department: 'sporting goods'},
            );
           
            let user = await db('users').where({id}).first()

            //assert the record was inserted
            expect(user.username).toBe('Chris')
          

        })

        it('should add a user and login the user into the db', async () => {
            //insert a record
            let { id } = await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2), department: 'sporting goods'},
            );
            let user = await Users.findBy({username: 'Chris'}).first()
            // console.log(user)
     
            //assert the record was inserted
            expect(user.username).toBe('Chris')
          

        })

        it('should add a user, login a user, return a list of users from db and check length', async () => {
            await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2), department: 'sporting goods'})
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2), department: 'video games'})
            await Users.add({username: 'Julie', password: bcrypt.hashSync('chocolate', 2), department: 'nutrition'})

            let users = await Users.find()
            // console.log(users)
     
            //assert a list of users is returned by length === 3
            expect(users).toHaveLength(3)

        })

        it('should add a user, login a user, return a list of users from db and assert usernames', async () => {
            //insert a record
            await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2), department: 'sporting goods'})
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2), department: 'video games'})
            await Users.add({username: 'Julie', password: bcrypt.hashSync('chocolate', 2), department: 'nutrition'})

            let users = await Users.find()
            // console.log(users)
            
            //assert a list of users is returned with correct data by username
            expect(users[0].username).toEqual('Chris')
            expect(users[1].username).toEqual('Jack')
            expect(users[2].username).toEqual('Julie')


        })
    })
})

/*describe('POST /users', function() {
    it('responds with json', function() {
      return request(server)
        .post('/users')
        .send({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2), department: 'sporting goods'})
        // .set({ Authorization: token })
        // .expect('Content-Type', 'application/json')
        // .expect(201) //getting a 404
        .then(response => {
            console.log(response)
        })
    });
});*/
