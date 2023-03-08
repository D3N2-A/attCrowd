import { authModalState } from "@/atom/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import LogIn from "./LogIn";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" justify="center">
      {modalState.view === "login" && <LogIn />}
      {/* {modalState.view === "signup" && <SignUp />} */}
    </Flex>
  );
};
export default AuthInputs;
