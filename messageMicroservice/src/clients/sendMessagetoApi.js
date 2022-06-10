import http from "http";
import "dotenv/config"



export default async (messageInfo, callback) => {

    let response
    const { destination, body } = messageInfo
    const content = JSON.stringify({ destination, body });


    const postOptions = {
        host: process.env.MESSAGEAPP,
        port: 3000,
        path: "/message",
        method: "post",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(content),
        }
    }

    const postReq = http.request(postOptions);

    postReq.on("response", async (postRes) => {


        response = postRes.statusCode === 200 ? "OK" : "ERROR"
        callback(messageInfo._id, { destination: destination, body: body, status: response })
    });

    postReq.on("timeout", async () => {

        console.error("Timeout Exceeded!");
        postReq.abort();

        callback(messageInfo._id, { destination: destination, body: body, status: "TIMEOUT" })
    });

    postReq.on("error", async (err) => {

        //implement retry
        callback(messageInfo._id, { destination: destination, body: body, status: "ERROR" })

    });
    postReq.write(content);
    postReq.end();
}





