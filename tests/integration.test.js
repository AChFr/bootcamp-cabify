const { expect } = require("chai")
const request = require("supertest")
const app = require("../app")


describe("Integration tests", () => {

    describe("endpoint and error test", () => {


        it("POST /messages returns either 200 and OK or 500 and custom error. Timeouts disabled", async () => {
            let i = 0
            while (i < 7) {
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

        it("POST /messages with wrong content type returns 400 and custom message ", async () => {
            const test = await request(app)
                .post("/messages",)
                .set("Content-type", "text")
                .send(" test string ")
                .expect(400)

            expect(test.body).to.deep.equal("You need to provide a valid JSON as a req.body.")

        })

        it("POST /messages with empty body returns 400 and custom message", async () => {
            const test = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .expect(400)

            expect(test.body).to.deep.equal("You need to provide a valid JSON as a req.body.")
        })

        it("POST /messages with missing or extra properties returns 400 and custom errors", async () => {
            const test1 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                })
                .expect(400)
            expect(test1.body).to.deep.equal("You need to provide both destination and message.")

            const test2 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                    "message": "testMessage",
                    "additionalInfo": "testInfo",
                })
                .expect(400)
            expect(test2.body).to.deep.equal("You need to provide destination and message only.")
        })

        it("POST /messages with empty values returns 400 and custom message", async () => {

            const test1 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "",
                    "message": "testMessage"
                })
                .expect(400)
            expect(test1.body).to.deep.equal("You need to specify both the destination and the message, they cannot be empty.")

            const test2 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                    "message": ""

                })
                .expect(400)
            expect(test2.body).to.deep.equal("You need to specify both the destination and the message, they cannot be empty.")
        })

        it("POST /messages with wrong keys returns 400 and custom message", async () => {

            const test1 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destinationErr": "testMessage",
                    "message": "testMessage"
                })
                .expect(400)
            expect(test1.body).to.deep.equal("The properties can only be called destination and message.")

            const test2 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                    "messageErr": "testMessage"

                })
                .expect(400)
            expect(test2.body).to.deep.equal("The properties can only be called destination and message.")

            const test3 = await request(app)
                .post("/messages",)
                .set("Accept", "application/json")
                .send({
                    "destinationErr": "testDestination",
                    "messageErr": "testMessage"

                })
                .expect(400)
            expect(test3.body).to.deep.equal("The properties can only be called destination and message.")
        })

        it("POST /message123 returns 404", async () => {
            const test = await request(app)
                .post("/message123",)
                .set("Accept", "application/json")
                .send({
                    "destination": "testDestination",
                    "message": "testBody"
                })
                .expect(404)

            expect(test.body).to.deep.equal("This route does not exist")

        })

        it("PUT,PATCH,DELETE to /messagesreturns 403 and custom message ", async () => {

            const test1 = await request(app)
                .put("/messages",)
                .set("Accept", "application/json")
                .expect(405)

            const test2 = await request(app)
                .patch("/messages",)
                .set("Accept", "application/json")
                .expect(405)

            const test3 = await request(app)
                .delete("/messages",)
                .set("Accept", "application/json")
                .expect(405)


            expect(test1.body && test2.body && test3.body).to.deep.equal("This method is not authorized for this endpoint")

        })


    })

})
