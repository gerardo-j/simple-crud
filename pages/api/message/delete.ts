import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'DELETE') {
    res.status(400).json({ message: 'Invalid method' })
    return;
  }

  const id = req.body.id;
  if (!id) {
    res.status(400).json({ message: 'Provide a id' })
    return
  }

  const db = (await connectToDatabase()).db('crud');
  const collection = db.collection('messages');

  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ deleteResult })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }



}