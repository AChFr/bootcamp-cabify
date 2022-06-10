import Queue from "bull";
let dato = { body: "aaaaa", message: "lalala" }

const queue = new Queue("myQueue", {

    redis: { host: "localhost", port: 6379 }
});

export default (dato) => {




    const main = async () => {
        //dentro de credito
        await mensajecola.add(pillaeldato)
    }

    credito.process((job, done) => {
        jobdat
        console.log(dato)
        done()
    })


    main().catch(console.error)
}


// export default (task, id) => {

//     console.log(`task ${id} started`)

//     const queue = new Queue("myQueue", {

//         redis: { host: "localhost", port: 6379 }
//     });

//     const main = async () => {

//         await queue.add(task)
//     }

//     queue.process((job, done) => {
//         job
//         done(console.log(`task ${id} finished`))
//     })


//     main().catch(console.error)
// }