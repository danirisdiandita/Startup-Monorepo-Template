"use client";
import { Button } from "@/components/catalyst/button";
import { Divider } from "@/components/catalyst/divider";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Heading } from "@/components/catalyst/heading";
import { Input } from "@/components/catalyst/input";
import { Text } from "@/components/catalyst/text";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { changePasswordFromCurrentPassword } from "../../../../lib/actions/user.action";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPasswordChange = async () => {
    setIsLoading(true);
    try {
      const results = await changePasswordFromCurrentPassword({
        currentPassword,
        newPassword,
      });
      toast.success("Password Successfully Changed", { position: "bottom-center" });
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage, { position: "bottom-center" });
    }

    setIsLoading(false);

    setNewPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
  };
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
            <Input
              name="current_password"
              type="password"
              value={currentPassword}
              onChange={(e) => {
                e.preventDefault();
                setCurrentPassword(e.target.value);
              }}
            />
          </Field>
          <Divider />
          <Field>
            <Label>New Password</Label>
            <Input
              name="new_password"
              type="password"
              value={newPassword}
              disabled={currentPassword.length === 0}
              onChange={(e) => {
                e.preventDefault();
                setNewPassword(e.target.value);
              }}
            />
            {newPassword.length > 0 && newPassword.length < 8 ? (
              <Text>Your new password must be more than 8 characters</Text>
            ) : (
              ""
            )}
          </Field>
          <Divider />
          <Field>
            <Label>Confirm New Password</Label>
            <Input
              name="confirm_new_password"
              type="password"
              value={confirmPassword}
              disabled={currentPassword.length === 0}
              onChange={(e) => {
                e.preventDefault();
                setConfirmPassword(e.target.value);
              }}
            />
            {newPassword.length > 0 && confirmPassword !== newPassword ? (
              <Text>
                Your passwords do not match. Please verify and try again.
              </Text>
            ) : (
              ""
            )}
          </Field>
          {newPassword.length > 0 || confirmPassword.length > 0 ? (
            <Divider />
          ) : (
            ""
          )}
        </div>
        {newPassword.length > 0 &&
        confirmPassword.length > 0 &&
        newPassword === confirmPassword ? (
          <div className="self-end space-x-2 flex justify-end mt-6">
            <Button
              outline
              onClick={() => {
                setNewPassword("");
                setConfirmPassword("");
                setCurrentPassword("");
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmitPasswordChange();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Loading
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default ChangePasswordPage;
