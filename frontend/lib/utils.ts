import { z } from "zod";

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));


export const authFormSchema = (type: string) =>  z.object({
    // sign up 
    firstName: type === 'sign-in' ? z.string().optional() :  z.string().min(3),
    lastName:type === 'sign-in' ? z.string().optional() :  z.string().min(3),
    // both 
    email: z.string().email(),
    password: z.string().min(8),
  });