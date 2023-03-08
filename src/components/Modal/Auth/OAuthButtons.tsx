import { Flex, Button, Image } from "@chakra-ui/react";
import React from "react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Flex align="center" justify="center" width="100%" margin="1rem 0">
      <Button variant="oauth">
        <Image src="/images/google.svg" height="20px" mr={2} /> Continue with
        Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
