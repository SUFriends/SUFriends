// posts.js
import { createHash } from "node:crypto";
import clientPromise from "../../../lib/mongodb_client";

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export default async function handler(req, res) {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db("sufriends");
    switch (req.method) {
        case "GET":
        const proposal = await db.collection("proposals").findById().toArray();
        console.log(all)
        res.json({ status: 200, data: all });
        break;
  }
}
