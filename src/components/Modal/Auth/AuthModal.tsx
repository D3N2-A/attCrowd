import { useRecoilState } from "recoil";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { authModalState } from "@/atom/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((prev) => {
      return { ...prev, open: false };
    });
  };
  return (
    <>
      <Modal
        isOpen={modalState.open}
        onClose={handleClose}
        isCentered
        motionPreset="scale"
        size="xs"
      >
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
              width="80%"
              flexDirection="column"
              pb={6}
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
              <OAuthButtons />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem 0",
                }}
              >
                <span
                  style={{ borderTop: "1px solid #edeff1", width: "40%" }}
                ></span>
                <span style={{ fontSize: "0.765rem" }}>OR</span>
                <span
                  style={{ borderTop: "1px solid #edeff1", width: "40%" }}
                ></span>
              </div>

              <AuthInputs />
              {/* 
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
