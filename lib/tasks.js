import clientPromise from "@/lib/mongodb";

export async function getTasksCollection() {
  const client = await clientPromise;

  const db = client.db(process.env.MONGODB_DATABASE);

  return db.collection("tasks");
}