import React, { useState } from "react";
import { Button, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot } from "react-icons/bs";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atom/authModalAtom";

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <>
      <Image src="/images/attCrowdFace.svg" width={100} height={100} />
      <Flex direction="column" alignItems="flex-start" width="100%">
        <Text fontWeight={700} mb={2}>
          Reset your password
        </Text>
        {success ? (
          <Text mb={4}>Check your email :)</Text>
        ) : (
          <>
            <Text fontSize="12px" mb={4}>
              Enter the email associated with your account and we will send you
              a reset link
            </Text>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
              <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                mb={2}
                onChange={(event) => setEmail(event.target.value)}
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
              <Text fontSize="10pt" color="red">
                {error?.message}
              </Text>
              <Button
                width="50%"
                height="36px"
                mb={2}
                mt={2}
                type="submit"
                isLoading={sending}
              >
                Reset Password
              </Button>
            </form>
          </>
        )}
        <Flex
          alignItems="center"
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          <Text
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
            fontSize="10px"
          >
            LOGIN
          </Text>
          <Icon as={BsDot} />
          <Text
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
            fontSize="10px"
          >
            SIGN UP
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
export default ResetPassword;
