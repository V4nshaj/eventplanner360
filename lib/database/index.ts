import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;//Url/uri we want connect to 

let cached = (global as any).mongoose || {conn: null, promise: null};//if we dont have mongoose cached then set it to null
//global as any above is used to access global variables in Node.js here imported mongoose is not a part of imported module but a global variable in Node.js
//cached is used to cached connection to the database
export const connectoDatabase = async () =>{
    if(cached.conn) return cached.conn;//cached.conn check if funcn already holds Mongodb(mongoose) connection i.e cache is already connected This ensures that the function doesn't attempt to connect to MongoDB multiple times if a connection is already established and cached. Here connection runs for the first time.

    if(!MONGODB_URI) throw new Error('MongoDB URI is missing');//if no mongoDB_URI is provided then throw an error

    //if we have cached conncetion from above
    //then return the cached connection else create a new mongoose connection
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {//here we are connect to already established mongoose connection or create a new one
        dbName: 'EventPlanner360',
        bufferCommands: false,//disable buffering on all models associated with this connection.
    });

    cached.conn = await cached.promise;
    return cached.conn;

}
