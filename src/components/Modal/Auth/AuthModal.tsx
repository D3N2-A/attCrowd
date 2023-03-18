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
import React, { useEffect } from "react";
import { authModalState } from "@/atom/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const handleClose = () => {
    setModalState((prev) => {
      return { ...prev, open: false };
    });
  };
  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);
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
            {modalState.view === "resetpassword" ? (
              <ResetPassword />
            ) : (
              <>
                <Flex
                  align="center"
                  justify="center"
                  width="80%"
                  flexDirection="column"
                  pb={6}
                >
                  <div style={{ fontSize: "12px", fontWeight: "thin" }}>
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
                  </div>
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
                </Flex>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
