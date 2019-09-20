const request = require('supertest');
const Users = require('../users/users-model')
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs');


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
    })
})

