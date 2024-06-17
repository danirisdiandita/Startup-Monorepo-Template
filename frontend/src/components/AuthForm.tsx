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
import { signIn, signUp } from "../../lib/actions/user.action";

// import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
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
        setUser(newUser);
      } else if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-18 lg:text-24 font-semibold text-gray-900 ">
            {type === "sign-in" ? "Sign in to your Account" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600 mt-4">
              {user
                ? "Link your account to get started"
                : "Not a member?"}

                <Link className="ml-2 font-bold" href="/sign-up">Register your Email</Link>
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
                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Address"
                  placeholder="Enter your Specific Address"
                />
                <CustomInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your City"
                />
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Example: NY"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Example: 11101"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="Example: 1234"
                  />
                </div>
              </>
            )}
            <CustomInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder={"Enter your Email"}
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your Password"
            />
            <div className="flex flex-col gap-4 items-center">
              <Button className="bg-slate-800 text-white rounded-full py-4 w-full" type="submit" disabled={isLoading}>
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

              or 

              <Button className="bg-slate-100 text-black rounded-full py-4 w-full" type="submit" disabled={isLoading}>
                Sign in With Google
              </Button>
            </div>
          </form>
        </Form>
        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="form-link"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </footer>
      </>
    </section>
  );
};

export default AuthForm;
