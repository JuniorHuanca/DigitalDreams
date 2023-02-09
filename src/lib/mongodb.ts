
import mongoose, { ConnectOptions } from 'mongoose'
import { dataUser } from './data'
import User from './models/User'

const MONGODB_URL = process.env.MONGODB_URL || ""
if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  )
}
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}
type ExtendedConnectOptions = ConnectOptions & {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {    
    const mongooseOptions: ExtendedConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    mongoose.set("strictQuery", false);

    cached.promise = mongoose.connect(MONGODB_URL, mongooseOptions)
      .then(mongoose => {
        // AffiliateStat.insertMany(dataAffiliateStat);
        // OverallStat.insertMany(dataOverallStat);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // User.insertMany(dataUser);
        return mongoose
      })
      .catch((error) => console.log(`${error} did not connect`));
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect