const { expect } = require("chai")
const request = require("supertest")
const app = require("../app")


describe("Integration tests", () => {

    describe("endpoint and error test", () => {


        it("POST /messages returns either 200 and OK or 500 and custom error. Timeouts disabled", async () => {
            let i = 0
            while (i < 15) {
                i++
                const test = await request(app)
                    .post("/messages",)
                    .set("Accept", "application/json")
                    .send({
                        "destination": "testDestination",
                        "message": "testBody"
                    })
                    .expect(200)
                    .catch(err => {
                        expect(500)
                        expect(err.message).to.include(`expected 200 "OK", got 500 "Internal Server Error"`)
                    })
            }

        }).timeout(0)


        it("POST /messages without a payload returns 400 ", async () => {
            const test = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .expect(400)
        })

        it("POST /messages with formating error returns 400 ", async () => {
            const test = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                })
                .expect(400)
        })

        it("POST /message123 returns 404", async () => {
            const test = await request(app)
                .post("/message",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                    "message": "testBody"
                })
                .expect(404)

            expect(test.body).to.deep.equal("This route does not exist")

        })
    })

})
