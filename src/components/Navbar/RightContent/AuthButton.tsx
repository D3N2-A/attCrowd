import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButton: React.FC = () => {
  return (
    <>
      <Button
        variant="outline"
        height="32px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
      >
        Log In
      </Button>
      <Button
        height="32px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButton;
