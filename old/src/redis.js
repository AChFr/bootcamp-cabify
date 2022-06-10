import { createClient } from "redis";

export default async () => {
    const client = createClient({
        url: `redis://${REDISDOKER}:6379`,

    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    console.log("CREDIT REDIS ON")
};