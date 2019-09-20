const request = require('supertest');
const server = require('./server.js');


describe('server.js', () => {
    describe('GET /', () => {
        it('returns 200 OK', () => {
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return { api: 'It's alive!'}", async () => {
            const res = await request(server).get('/');
            expect(res.text).toBe("It's alive!");
            expect(res.text).toEqual('It\'s alive!')
        })
        it('returns JSON', done => {
            request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch(/html/i);
                done()
            })
        })


    })
})
