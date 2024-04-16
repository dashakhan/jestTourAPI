import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('PHOTOS', () => {
    it('get request', async () => {
        const res = await request.get('/photos')
        //console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].id).toBe(1);

    });
    it('PHOTOS request', async () => {
        const data = {
            title: "My first photos request",
            body: "This is my first photos request",
            userId: 1001
        }
        const res = await request.post("/photos").send(data);
        expect(res.statusCode).toEqual(201),
            expect(res.body.title).toEqual("My first photos request")
    });
    it('PATCH request with title version 1', async () => {
        const data = {
            title: 'My first request'
        }
        const getRes = await request.get('/photos/1')
        const beforeTitle = getRes.body.title
        const res = await request.patch('/photos/1').send(data)
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe(data.title);
        expect(res.body.title).not.toBe(beforeTitle)
    });

    it('PATCH request with title version 2', async () => {
        const data = {
            title: 'My second request'
        }

        const getRes = await request.get('/photos/1')
        const beforeTitle = getRes.body.title
        await request
            .patch('/photos/1')
            .send(data)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.title).toBe(data.title)
                expect(response.body.title).not.toBe(beforeTitle)
            })
    });

    it('PATCH request with title version 3', (done) => {
        const data = {
            title: 'My post request'
        }
        let beforeTitle = null;
        //taking data from database as initial value
        request.get("/photos/1").end((err, res) => {
            if (err) return done(err);
            beforeTitle = res.body.title;
        });
        //updating the current data to new value
        request
            .patch('/photos/1')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.title).toBe(data.title)
                //expect(res.body.title).not.toBe(beforeTitle)
                done()
            })
    });

    it('DELETE request', async () => {
        const res = await request.delete('/photos/1')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
    })
});
