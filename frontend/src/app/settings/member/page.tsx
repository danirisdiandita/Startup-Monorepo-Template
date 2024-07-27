"use client";
import { Divider } from "@/components/catalyst/divider";
import { Heading } from "@/components/catalyst/heading";
import Head from "next/head";
import React, { useState } from "react";
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
import { Field, Label } from "@/components/catalyst/fieldset";

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
const Workspace = () => {
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
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
                    />
                  </InputGroup>
                </Field>
              </DialogBody>
              <DialogActions>
                <Button plain onClick={() => setIsOpenAddMember(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpenAddMember(false)}>
                  Refund
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
