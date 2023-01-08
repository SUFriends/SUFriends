// posts.js
import { createHash } from "node:crypto";
import clientPromise from "../../lib/mongodb_client";

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sufriends");
  switch (req.method) {
    case "POST":
      // TODO check on the blockchain 
      // if this proposal hash is really proposed by this proposer 
      let bodyObject = JSON.parse(JSON.stringify(req.body));
      console.log(bodyObject);
      bodyObject["descriptionHash"] = sha256(req.body["description"]);
      let proposal = await db.collection("proposals").insertOne(bodyObject);
      res.json(proposal.ops[0]);
      break;
    case "GET":
      const all = await db.collection("test").find({}).toArray();
      res.json({ status: 200, data: all });
      break;
  }
}
