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

interface forgotPasswordEmailProps {
  username?: string;
  forgotPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const forgotPasswordEmail = ({ username, forgotPasswordLink }: forgotPasswordEmailProps) => {
  const previewText = `Join ${username} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Reset Your Password</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Hi {username},</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to reset the password for your account. If
              you did not make this request, please ignore this email.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              To reset your password, click on the link below. This link will
              expire in 12 hours
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded-full text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={forgotPasswordLink}
              >
                Reset your password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={forgotPasswordLink} className="text-blue-600 no-underline">
                {forgotPasswordLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{" "}
              <span className="text-black">{username}</span>. If you were not
              expecting this email, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

forgotPasswordEmail.PreviewProps = {
  username: "alanturing",
  forgotPasswordLink: "https://vercel.com/teams/invite/foo",
} as forgotPasswordEmailProps;

export default forgotPasswordEmail;
