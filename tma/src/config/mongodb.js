import {env} from '../config/environment.js'


import { MongoClient, ServerApiVersion } from "mongodb";

let trelloDatabaseInstance = null;

const MongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict : true,
        deprecationErrors: true,
       }
}
);

export const CONNECT_DB = async () => {
    await MongoClientInstance.connect()
    trelloDatabaseInstance = MongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error ('Must connect to Database first!')
        return trelloDatabaseInstance
}
export const CLOSE_DB = async() =>{
    await MongoClientInstance.close()
}