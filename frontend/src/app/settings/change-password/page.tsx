import { Button } from "@/components/catalyst/button";
import { Divider } from "@/components/catalyst/divider";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Heading } from "@/components/catalyst/heading";
import { Input } from "@/components/catalyst/input";
import { Text } from "@/components/catalyst/text";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <main>
        <div className="border-b border-zinc-950/10 dark:border-white/10 pb-2">
          <Heading>Change Your Password</Heading>
          <Text>
            Please enter your current password to change your password
          </Text>
        </div>
        <div className="flex-col space-y-4 mt-2">
          <Field>
            <Label>Current Password</Label>
            <Input name="current_password" type="password" />
          </Field>
          <Divider />
          <Field>
            <Label>New Password</Label>
            <Input name="new_password" type="password" />
            <Text>Your new password must be more than 8 characters</Text>
          </Field>
          <Divider />
          <Field>
            <Label>Confirm New Password</Label>
            <Input name="confirm_new_password" type="password" />
          </Field>
          <Divider />
        </div>
        <div className="self-end space-x-2 flex justify-end mt-6">
          <Button outline>Cancel</Button>
          <Button>Update Password </Button>
        </div>
      </main>
    </>
  );
};

export default ChangePasswordPage;
