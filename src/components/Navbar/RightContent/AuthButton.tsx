import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import React from "react";
import { authModalState } from "@/atom/authModalAtom";

const AuthButton: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant="outline"
        height="32px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          setModalState({ open: true, view: "login" });
        }}
      >
        Log In
      </Button>
      <Button
        height="32px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          setModalState({ open: true, view: "signup" });
        }}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButton;
