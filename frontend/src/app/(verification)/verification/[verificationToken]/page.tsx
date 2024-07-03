import React from "react";

const VerificationPage = ({
  params,
}: {
  params: { verificationToken: string };
}) => {
  return <div>{params?.verificationToken ? params?.verificationToken: 'gitu'}</div>;
};

export default VerificationPage;
