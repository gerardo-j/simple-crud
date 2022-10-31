import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(400).json({ message: 'Invalid method' })
    return;
  }

  const message = req.body.message;
  if (!message) {
    res.status(400).json({ message: 'Provide a message' })
    return
  }

  const db = (await connectToDatabase()).db('crud');
  const collection = db.collection('messages');

  try {
    const insertResult = await collection.insertOne({ message });
    res.status(200).json({ insertResult })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }



}