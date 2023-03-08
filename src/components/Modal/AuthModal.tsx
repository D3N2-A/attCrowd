import { useRecoilState } from "recoil";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { authModalState } from "@/atom/authModalAtom";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((prev) => {
      return { ...prev, open: false };
    });
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "login"
              ? "Log In"
              : modalState.view === "signup"
              ? "Sign Up"
              : "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Flex
              align="center"
              justify="center"
              width="70%"
              border="1px solid red"
            >
              <p style={{ fontSize: "12px", fontWeight: "thin" }}>
                By continuing, you agree are setting up a Reddit account and
                agree to our{" "}
                <a
                  href="https://www.random.org/terms/2020-08-01/website"
                  target="_blank"
                  style={{ color: "#0079d3" }}
                >
                  User Agreement and Privacy Policy
                </a>
                .
              </p>

              {/* 
              <OAuthButtons/>
              <AuthInputs/>
              <ResetPassword/>
              */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
