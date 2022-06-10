import mongoose from "mongoose";
import "dotenv/config"

const serverMain = `${process.env.MAIN_CREDIT}`
const databaseMain = "credit_main"

const serverBackup = `${process.env.REPLICA_CREDIT}`;
const databaseBackup = "credit_backup"


const mainCredit = mongoose.createConnection(`mongodb://${serverMain}/${databaseMain}`, {
  useNewUrlParser: true,
})
const reserveCredit = mongoose.createConnection(`mongodb://${serverBackup}/${databaseBackup}`, {
  useNewUrlParser: true,
})

let mainDatabase = mainCredit
let backupDatabase = reserveCredit


//// the changes are registered, but I
// am unable to make the db switch roles 
//after the initial boot up.
const connectionSwitch = (db1, db2) => {

  db1.on("connected", () => {
    console.log(`${db1.name} is connected`)
    console.log(`${db1.name} is the main database`)

    mainDatabase = db1
  })
  db2.on("connected", () => {
    console.log(`${db2.name} is connected`)
    console.log(`${db2.name} is the backup database`)

    backupDatabase = db2
  })
  db1.on("disconnected", () => {
    console.log(`${db1.name} is disconnected`)
    console.log(`${db2.name} is the main database`)

    mainDatabase = db2
  })
  db1.on("reconnected", () => {
    console.log(`${db1.name} is reconnected`)
    console.log(`${db2.name} is the main database`)
    console.log(`${db1.name} is the backup database`)

    backupDatabase = db1
  })
  db2.on("disconnected", () => {
    console.log(`${db2.name} is disconnected`)
    console.log(`${db1.name} is the main database`)

    mainDatabase = db1
  })
  db2.on("reconnected", () => {
    console.log(`${db2.name} is reconnected`)
    console.log(`${db1.name} is the main database`)
    console.log(`${db2.name} is the backup database`)

    backupDatabase = db2
  })

}

connectionSwitch(mainCredit, reserveCredit)

export { mainDatabase, backupDatabase }