// lib/mongodb.ts

import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI!;
const certPath = process.env.MONGODB_CERT_PATH!; // path like ./certs/global-bundle.pem

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri, {
    tls: true,
    tlsCAFile: certPath, // ✅ direct file path works fine
  });

  (global as any)._mongoClientPromise = client.connect();
}
  
clientPromise = (global as any)._mongoClientPromise;

export default clientPromise;
