import request from "supertest";
import {app} from "../main";


// TODO tests that base on one another
describe("Products Router", () => {
    it('GET /', async () => {
        const res = await request(app)
            .get('/products?q=Bible')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.products.length as Number)
            .toBeGreaterThan(0);
    });

    it('GET / with q', async () => {
        const res = await request(app)
            .get('/products?q=Bible')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.products.length as Number)
            .toBeGreaterThan(0);
    });

    it('GET /<id>', async () => {
        const res = await request(app)
            .get('/products/645cd4c985318b80023666b5')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body).not.toBe({});
    });

    it('POST /add', async () => {
        let res = await request(app)
            .post('/products/add')
            .send(
                {
                    "name": "Rune Engraver",
                    "description": "Collection of tools that any runegraver needs in his workshop",
                    "price": 233,
                    "rating": 2,
                    "stock": 80123
                  }
            )
            .set('Accept', 'application/json')

        expect(res.status).toBe(201);

        res = await request(app)
            .get('/products?q=Rune Engraver')
            .set('Accept', 'application/json')

        expect(res.body.products.length as Number)
            .toBeGreaterThan(0);
    });

    it.todo('PUT /<id>')
    it.todo('UPDATE /<id>')
    it.todo('DELETE /<id>')
});
