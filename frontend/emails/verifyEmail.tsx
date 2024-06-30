import {
  Button,
  Html,
  render,
  Tailwind,
  Container,
  Text,
} from "@react-email/components";

const verificationEmail = ({ url }: { url: string }) => {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Container className="flex-col items-center justify-between space-y-5">
          <Text>Hi User</Text>
          <Text>
            You're almost there! Please ensure this is your most recent
            verification email
          </Text>
          <Text>
            Please verify your email to activate your account. This button will
            expire in 12 hours
          </Text>
          <Text>
            Thank you for registering for our service! Please click the link
            below to verify your account.
          </Text>
          <Button
            href={url}
            className="bg-slate-900 px-3 py-4 font-medium leading-4 text-white rounded-full text-center w-full"
          >
            Verify your email address
          </Button>
          <Text>Thanks</Text>
          <Text>The My Company Name</Text>
        </Container>
      </Tailwind>
    </Html>
  );
};

export default verificationEmail;
