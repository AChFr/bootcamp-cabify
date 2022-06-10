import Queue from "bull";


export default (task, id) => {

    console.log(`task ${id} started`)

    const queue = new Queue("myQueue", {

        redis: { host: "localhost", port: 6379 }
    });

    const main = async () => {

        await queue.add(task)
    }

    queue.process((job, done) => {
        job
        done(console.log(`task ${id} finished`))
    })


    main().catch(console.error)
}