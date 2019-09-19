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
            expect(res.body.api).toBe("It's alive!");
            expect(res.body).toEqual({ api: 'It\'s alive!'})
        })
        it('returns JSON', done => {
            request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
                done()
            })
        })


    })
})
