import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface InvitationEmailProps {
  username?: string;
  inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TeamInvitationEmail = ({
  username,
  inviteLink,
}: InvitationEmailProps) => {
  const previewText = `${username} invited you to collaborate on DataQuery`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Workspace Invitation</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Invitation to DataQuery</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <i>{username}</i> invited you to collaborate on DataQuery
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Click on this link to verify your email address and login
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded-full text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Accept Invitation
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              New to DataQuery? Data Query is the easiest way for doing ETL
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

TeamInvitationEmail.PreviewProps = {
  username: "Norma Dani Risdiandita",
  inviteLink: "https://vercel.com/teams/invite/foo",
} as InvitationEmailProps;

export default TeamInvitationEmail;
