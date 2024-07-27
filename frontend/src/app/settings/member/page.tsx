import { Divider } from "@/components/catalyst/divider";
import { Heading } from "@/components/catalyst/heading";
import Head from "next/head";
import React from "react";
import { Text } from "@/components/catalyst/text";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table";
import { Avatar } from "@/components/catalyst/avatar";

const users = [
  {
    name: "Norma Dani Risdiandita",
    email: "norma.risdiandita@gmail.com",
    access: "admin",
  },
];
const Workspace = () => {
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
            <Button>Add Member</Button>
          </div>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
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
                      <div>{user.name}</div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
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
