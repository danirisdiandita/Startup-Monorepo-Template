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

const users = [
  {
    name: "Norma Dani Risdiandita",
    email: "norma.risdiandita@gmail.com",
    access: "admin",
    role: "admin",
    handle: "key_0",
    isme: true,
  },
  {
    name: "Farah",
    email: "farah@gmail.com",
    role: "member",
    access: "edit",
    handle: "key_1",
  },
];

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Workspace = () => {
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
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
      <Heading>Invite Your Team Member</Heading>
      <Divider className="mt-6" />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-zinc-900">
        <div className="px-4 py-5 sm:p-6 flex-col space-y-4">
          <div className="flex-col space-y-2">
            <Text>Team name</Text>
            <Input value={"norma.risdiandita@gmail.com"} />
          </div>
          <Button>Save Changes</Button>
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
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.handle}>
                    <TableCell className="font-medium flex justify-start space-x-2 items-center">
                      <Avatar
                        initials="NR"
                        square
                        className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black-1 font-semibold"
                      />
                      <div>
                        {user.name}
                        {user.isme ? (
                          <Badge color="lime" className="ml-2">
                            you
                          </Badge>
                        ) : (
                          ""
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-zinc-500">{user.role}</TableCell>
                    <TableCell className="text-zinc-500">
                      {user.access}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Workspace;
