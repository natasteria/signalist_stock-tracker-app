import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null,
        promise: Promise<typeof  mongoose> | null
    } // This typescript declaration extends the global object's type definition
}

let cached = global.mongooseCache; // During the first execution of the program javascript isn't aware of the mongooseCached object so it will return null. This happens only on the first execution.

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null}; //Initializing the object only for the first execution of the program. We create a globally available cached variable that contains an object.
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

    if(cached.conn) return cached.conn //return a successful connection if it already exists. Avoiding any async operation.

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    } // makes sure that only a single connection is established & reused for all the database needs of the program.

    try {
        cached.conn = await cached.promise; // cached.conn holds a single, persistent database connection object established by Mongoose. This object is the long-lived, open TCP socket connection to your MongoDB server. It's an expensive resource to create and that why it's cached globally.
    } catch(err){
        cached.promise = null; // sets to promise to null so that database requesting process can retry to establish connection to the database.
        throw err;
    }

    console.log(`Connected to database: ${process.env.NODE_ENV}- ${MONGODB_URI}`);

    return cached.conn;
}


