
const{MongoClient}=require("mongodb")
const url="mongodb+srv://dhimantamanjot_db_user:nDn4jn3q9rQjtbwZ@orgdb.h8akrsd.mongodb.net/";
const client= new MongoClient(url);
const dbName="FirstDB";
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('UserCollection');


  const data={
    firstname: "Raman",
    lastname: "deep",
    city: "Mumbai"
  }

  const data1={
    firstname: "Raj",
    lastname: "",
    city: "Banglore"
  }
  const insertResult = await collection.insertMany([data, data1]);
  console.log('Inserted documents =>', insertResult);

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  const updateResult = await collection.updateOne({firstname: "Raman"}, { $set: {city: "Banglore"} });
  console.log('Updated documents =>', updateResult);

  const deleteResult = await collection.deleteMany({firstname: "Raman"});
  console.log('Deleted documents =>', deleteResult);

  const findDoc=await collection.find({firstname: "Raj"}).toArray();
  console.log(findDoc);

  const countDoc=await collection.countDocuments({});
  console.log("Count of Documents", countDoc);

  return 'done.';
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());