import {connect, disconnect} from 'mongoose'

const connectToDb = async () => {

    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("Error while connecting")
        console.log(error)
    }
}

const disconnectToDb = async () => {

    try {
        await disconnect()
    } catch (error) {
        console.log("Error while disconnecting")
        console.log(error)
    }
}

export {connectToDb, disconnectToDb};
