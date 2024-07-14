"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/actions/user.action";
import {
  signIn as signInWithNextAuth,
  useSession,
} from "next-auth/react";

import { PagePath } from "@/common/constants/page-path.constant";
import { toast } from 'sonner'; 

// import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push(PagePath.DASHBOARD);
  }

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
        router.push(`/please-confirm/${data.email}`)
        setUser(newUser);
      } else if (type === "sign-in") {
        
        const response = await signInWithNextAuth('credentials', {email: data?.email, password: data?.password, redirect: false})  

        // if success show below

        // {
        //   "error": null,
        //   "status": 200,
        //   "ok": true,
        //   "url": "http://127.0.0.1:3000/sign-in"
        // }

        // if error show below                
        // {
        //   "error": "Incorrect Password",
        //   "status": 200,
        //   "ok": true,
        //   "url": null
        // }
        if (response?.error) {
          // console.log('error reason', response?.error)
          toast.error(response?.error, {position: 'bottom-center'})
        } else {
          router.push("/dashboard");
        }

      }
    } catch (err) {

      // console.log('err', err)

      let errorMessage: string = ''; 

      if (err instanceof Error) {
        errorMessage = err.message; 
      } else if (typeof err === "string") {
        errorMessage = err 
      } 

      toast.error(errorMessage, {position: 'bottom-center'})
      

    } finally {
      setIsLoading(false);
    }
  };


  const onGoogleSignInSubmit = async () => {
    setIsLoading(true); 
    const response = await signInWithNextAuth("google", {redirect: false})
    console.log('response from google sign in ', response)

   
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-1 md:gap-3 mb-2">
          <h1 className="text-18 lg:text-24 font-semibold text-gray-900 ">
            {type === "sign-in"
              ? "Sign in to Your Account"
              : "Sign Up to Create Your Account"}
            <p className="text-16 font-normal text-gray-600 mt-4">
              {type === "sign-in"
                ? "Not a member?"
                : "Already have an account?"}
              <Link
                className="ml-2 form-link"
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              >
                {type === "sign-in"
                  ? "Register your Account"
                  : "Login to your account"}
              </Link>
            </p>
          </h1>
        </div>
      </header>

      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "sign-up" && (
              <>
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your First Name"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                  />
                </div>
              </>
            )}
            <CustomInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="Enter your Email Address"
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your Password"
            />

            <div className="flex flex-col gap-4 items-center">
              {type === "sign-in" ? (
                <Link href="/forgot-password" className="form-link ml-auto">
                  Forgot Password?
                </Link>
              ) : null}
              <Button
                className="bg-slate-800 text-white rounded-full py-4 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading ...
                  </>
                ) : type === "sign-in" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex flex-col items-center">
          <p className="mb-8">or</p>
          <Button
            className="bg-slate-100 text-black rounded-full py-4 w-full"
            type="submit"
            disabled={isLoading}
            onClick={() => onGoogleSignInSubmit()}
          >
            <Image
              className="mr-2"
              src="/icons/google-icon.svg"
              width={20}
              height={20}
              alt="google-sign-in-icon"
            />
            {type === "sign-in" ? "Sign in With Google" : "Sign Up With Google"}
          </Button>
        </div>
        <footer className="flex justify-center gap-1"></footer>
      </>
    </section>
  );
};

export default AuthForm;
