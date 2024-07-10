import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";

async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { verificationToken } = req.query;
      console.log('verificationToken', verificationToken)
      const backendService = new BackendService();
      const response = await backendService.updateVerificationStatus(
        verificationToken
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error) {
        res.status(500).json("Something went wrong");
      }
    }
  }
}
