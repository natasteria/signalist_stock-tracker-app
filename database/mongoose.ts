import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null,
        promise: Promise<typeof  mongoose> | null
    } // adding a globally avaliable typescript type name moongoose
}

let cached = global.mongooseCache; //creating a runtime javascript object named cached and typescript will provide autocomplete and typechecking

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null}; //passing a value as on the first execution it will be empty object
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

    if(cached.conn) return cached.conn

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {
        cached.conn = await cached.promise;
    } catch(err){
        cached.promise = null;
        throw err;
    }

    console.log(`Connected to database: ${process.env.NODE_ENV}- ${MONGODB_URI}`);
}


async function main() {
    await connectToDatabase();
}

main();