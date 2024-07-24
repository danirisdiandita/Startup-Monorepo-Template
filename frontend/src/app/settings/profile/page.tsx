"use client";
import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import React from "react";
import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Select } from "@/components/catalyst/select";
import { Textarea } from "@/components/catalyst/textarea";
import clsx from "clsx";

const ProfilePage = () => {
  return (
    <>
      <div className="border-b border-zinc-950/10 dark:border-white/10 pb-6">
        <Heading>My Profile</Heading>
      </div>
      <form action="/orders" method="POST" className="mt-5">
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="norma.risdiandita@gmail.com"
                type="email"
                disabled={true}
              />
            </Field>
            <Field>
              <Label>Password</Label>
              <button
                onClick={() => console.log("klik klik password ")}
                className="mt-3 pt-2 pb-1 px-3 border border-zinc-950/10 dark:border-white/10 rounded-lg items-center dark:text-zinc-700 text-base/6 w-full sm:text-sm/6 text-zinc-500 text-left dark:bg-white/[2.5%]"
              >
                ********
              </button>
            </Field>
            <Field>
              <Label>Country</Label>
              <Select name="country">
                <option>Canada</option>
                <option>Mexico</option>
                <option>United States</option>
              </Select>
              <Description>
                We currently only ship to North America.
              </Description>
            </Field>
            <Field>
              <Label>Delivery notes</Label>
              <Textarea name="notes" />
              <Description>
                If you have a tiger, we'd like to know about it.
              </Description>
            </Field>
          </FieldGroup>
        </Fieldset>
        {/* ... */}
      </form>
    </>
  );
};

export default ProfilePage;
