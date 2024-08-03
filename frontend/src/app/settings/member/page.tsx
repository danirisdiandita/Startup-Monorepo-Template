"use client";
import { Divider } from "@/components/catalyst/divider";
import { Heading } from "@/components/catalyst/heading";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Text } from "@/components/catalyst/text";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table";
import { Avatar } from "@/components/catalyst/avatar";
import { Badge } from "@/components/catalyst/badge";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import {
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
} from "@/components/catalyst/fieldset";
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@/components/catalyst/checkbox";
import {
  useGetDefaultMembersQuery,
  useUpdateDefaultWorkspaceNameMutation,
} from "@/lib/services/member";
import { useSession } from "next-auth/react";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Workspace = () => {
  const { data: memberData, error, isLoading } = useGetDefaultMembersQuery();
  const [updateDefaultWorkspaceName, defaultWorkspaceResult] =
    useUpdateDefaultWorkspaceNameMutation();
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [defaultWorkspaceName, setDefaultWorkspaceName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const session = useSession();

  useEffect(() => {
    if (memberData) {
      if (memberData.length > 0) {
        setDefaultWorkspaceName(memberData[0].team_name);
      }
    }
  }, [memberData]);

  useEffect(() => {
    if (defaultWorkspaceName !== "") {
      setWorkspaceName(defaultWorkspaceName);
    }
  }, [defaultWorkspaceName]);

  const [isNewMemberButtonDisabled, setIsNewMemberButtonDisabled] =
    useState(true);
  const [isNewMemberDropdownAppear, setIsNewMemberDropdownAppear] =
    useState(false);

  useEffect(() => {
    const isNewMemberValidEmail = validateEmail(newMemberEmail);
    if (isNewMemberValidEmail) {
      setIsNewMemberButtonDisabled(false);
      setIsNewMemberDropdownAppear(true);
    } else {
      setIsNewMemberButtonDisabled(true);
      setIsNewMemberDropdownAppear(false);
    }
  }, [newMemberEmail]);

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Heading>Invite Your Team Member to your Workspace</Heading>
      <Divider className="mt-6" />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-zinc-900">
        <div className="px-4 py-5 sm:p-6 flex-col space-y-4">
          <div className="flex-col space-y-2">
            <Text>Change your Workspace name</Text>
            <Input
              value={isLoading ? "Please wait..." : workspaceName}
              onChange={(e: any) => {
                e.preventDefault();
                setWorkspaceName(e.target.value);
              }}
              disabled={isLoading}
            />
          </div>
          <Button
            disabled={
              workspaceName === defaultWorkspaceName ||
              workspaceName === "" ||
              defaultWorkspaceName === ""
            }
            onClick={() => {
              console.log("do something");
            }}
          >
            Save Changes
          </Button>
          <Divider />
          <h1 className="dark:text-white text-black-2">Members</h1>
          <div className="justify-between flex sm:flex-row flex-col space-y-4 sm:space-y-0">
            <div className="md:w-1/3">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name="search"
                  placeholder="Search&hellip;"
                  aria-label="Search"
                />
              </InputGroup>
            </div>
            <Button
              type="button"
              onClick={() => {
                setIsOpenAddMember(true);
              }}
            >
              <PlusIcon className="text-white dark:text-white" />
              Add Member
            </Button>
            <Dialog
              size="xl"
              open={isOpenAddMember}
              onClose={setIsOpenAddMember}
            >
              <DialogTitle>Add a member to your team</DialogTitle>
              <DialogDescription>
                Enter a valid email address to invite a new member
              </DialogDescription>
              <DialogBody>
                <Field>
                  <InputGroup>
                    <MagnifyingGlassIcon />
                    <Input
                      name="search"
                      placeholder="Type to add a new member"
                      aria-label="Search"
                      value={newMemberEmail}
                      onChange={(e) => {
                        e.preventDefault();
                        setNewMemberEmail(e.target.value);
                      }}
                    />
                  </InputGroup>
                  {isNewMemberDropdownAppear ? (
                    <div
                      className={`mt-3 bg-zinc-950 px-3 py-2 rounded-lg cursor-default`}
                    >
                      <p className="dark:text-white text-zinc-950 text-base/6 sm:text-sm/6">
                        Add a new member
                      </p>
                      <Text>{newMemberEmail}</Text>
                    </div>
                  ) : (
                    ""
                  )}
                </Field>
              </DialogBody>
              <DialogActions>
                <Button
                  plain
                  onClick={() => {
                    setIsOpenAddMember(false);
                    setNewMemberEmail("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenAddMember(false);
                    setNewMemberEmail("");
                  }}
                  disabled={isNewMemberButtonDisabled}
                >
                  Add New Member
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Access</TableHeader>
                </TableRow>
              </TableHead>
              {memberData ? (
                <TableBody>
                  {memberData.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium flex justify-start space-x-2 items-center w-72">
                        <Avatar
                          initials={user?.first_name[0] + user?.last_name[0]}
                          square
                          className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black-1 font-semibold"
                        />
                        <div>
                          {user.first_name + " " + user.last_name}
                          {session?.data?.email === user.email ? (
                            <Badge color="lime" className="ml-2">
                              you
                            </Badge>
                          ) : (
                            ""
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="w-72">{user.email}</TableCell>
                      <TableCell className="text-zinc-500 w-32">
                        {user.role}
                      </TableCell>
                      <TableCell className="text-zinc-500 w-32">
                        {user.access}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {[{}, {}, {}, {}, {}].map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium flex justify-start space-x-2 items-center w-72">
                        <Avatar
                          initials=""
                          square
                          className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black-1 font-semibold"
                        />
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      </TableCell>
                      <TableCell className="w-72">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      </TableCell>
                      <TableCell className="text-zinc-500 w-32">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      </TableCell>
                      <TableCell className="text-zinc-500 w-32">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
          {/* <p>{data ? JSON.stringify(data): ''}</p> */}
        </div>
      </div>
    </>
  );
};

export default Workspace;
