import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";

// export async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//       const { verificationToken } = req.query;
//       const backendService = new BackendService();
//       console.log('verifiatio', verificationToken)
//       const response = await backendService.updateVerificationStatus(
//         verificationToken
//       );
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       if (error) {
//         res.status(500).json("Something went wrong");
//       }
//     }
//   }
// }


import { NextResponse } from 'next/server'
 
export async function GET(request: NextApiRequest) {
  const verificationToken = request.url?.split("/api/verify-email/")?.at(-1)
  return NextResponse.json({ msg: 'Hello from server' })
}