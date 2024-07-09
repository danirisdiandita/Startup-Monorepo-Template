import BackendService from "@/common/backend.service";
import { NextApiRequest, NextApiResponse } from "next";



async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const backendService = new BackendService(); 

            
            
        } catch (error) {
            
        }
    }
}