import { authModalState } from "@/atom/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

type LogInProps = {};

const LogIn: React.FC<LogInProps> = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleSubmit = (): any => {
    console.log("SUbmitted");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form onSubmit={handleSubmit()}>
      <Input
        required
        type="email"
        name="email"
        placeholder="Email"
        mb={2}
        onChange={(e) => handleChange(e)}
        fontSize="12px"
        borderRadius={100}
        fontWeight={500}
        _placeholder={{
          color: "gray.500",
          fontSize: "12px",
          transition: "all 0.2s ease-in-out",
        }}
        transition="all 0.2s"
        _hover={{
          border: "1px solid #00000033",
          _placeholder: {
            transform: "translateY(-13px)",
            fontSize: "10px",
          },
        }}
      />
      <Input
        required
        type="password"
        name="password"
        placeholder="Password"
        mb={2}
        onChange={(e) => handleChange(e)}
        fontSize="12px"
        borderRadius={100}
        fontWeight={500}
        _placeholder={{
          color: "gray.500",
          fontSize: "12px",
          transition: "all 0.2s ease-in-out",
        }}
        transition="all 0.2s"
        _hover={{
          border: "1px solid #00000033",
          _placeholder: {
            transform: "translateY(-13px)",
            fontSize: "10px",
          },
        }}
      />
      <Button width="100%" height="40px" mt="1rem">
        Log In
      </Button>
      <Flex justify="flex-start" align="center" mt="1rem" fontSize={12}>
        <div>New to attCrowd? </div>
        <Text
          color="#0079d3"
          decoration="underline"
          ml={1}
          cursor="pointer"
          onClick={() => {
            setModalState((prev) => ({ ...prev, view: "signup" }));
          }}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default LogIn;
