import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'PATCH') {
    res.status(400).json({ message: 'Invalid method' })
    return;
  }

  const id = req.body.id;
  const message = req.body.message;
  if (!id || !message) {
    res.status(400).json({ message: 'Provide a id and message' })
    return
  }

  const db = (await connectToDatabase()).db('crud');
  const collection = db.collection('messages');

  try {
    const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { message } });
    res.status(200).json({ updateResult })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Something went wrong' })
  }

}