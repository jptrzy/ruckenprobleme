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

    it('PUT /<id>', async () => {
        let res = await request(app)
            .put('/products/645cd4c985318b80023666b5')
            .send(
                {
                    "name": "Newer Bible"
                }
            )
            .set('Accept', 'application/json')

        expect(res.status).toBe(201);

        res = await request(app)
            .get('/products/645cd4c985318b80023666b5')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(
            {
                "_id": "645cd4c985318b80023666b5",
                "name": "Newer Bible",
                "description": "Collection of multiple books",
                "price": 99,
                "rating": 5,
                "stock": 10
            }
        );
    })

    it.todo('UPDATE /<id>')
    
    it('DELETE /<id>', async () => {
        let res = await request(app)
            .del('/products/645cd4c985318b80023666b5')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);

        res = await request(app)
            .get('/products/645cd4c985318b80023666b5')
            .set('Accept', 'application/json')

        expect(res.status).toBe(404)
    })
});
