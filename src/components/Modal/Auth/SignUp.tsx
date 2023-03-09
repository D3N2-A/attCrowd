import { authModalState } from "@/atom/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { UserCredential } from "firebase/auth";

type SignUpProps = {};

const SignUp: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  //--------------------Handeling Submit------------------------//
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (error) setError("");
    e.preventDefault();
    if (loginData.password !== loginData.confirmPassword) {
      setError("Password does not match!");
      return;
    } else {
      createUserWithEmailAndPassword(loginData.email, loginData.password);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <Input
        required
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
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
      {error ||
        (userError && (
          <p style={{ fontSize: "10px", color: "red" }}>
            {error || userError.message}
          </p>
        ))}

      <Button
        width="100%"
        height="40px"
        mt="1rem"
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex justify="flex-start" align="center" mt="1rem" fontSize={12}>
        <div>Already a crowder? </div>
        <Text
          color="#0079d3"
          decoration="underline"
          ml={1}
          cursor="pointer"
          onClick={() => {
            setModalState((prev) => ({ ...prev, view: "login" }));
          }}
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
