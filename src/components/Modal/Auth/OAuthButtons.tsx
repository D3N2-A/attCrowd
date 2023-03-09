import { Flex, Button, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import React from "react";
import { auth } from "@/firebase/clientApp";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex
      align="center"
      justify="center"
      width="100%"
      margin="1rem 0"
      flexDirection="column"
    >
      <Button
        variant="oauth"
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image src="/images/google.svg" height="20px" mr={2} /> Continue with
        Google
      </Button>
      {error && (
        <p style={{ fontSize: "10px", color: "red" }}>{error.message}</p>
      )}
    </Flex>
  );
};
export default OAuthButtons;
