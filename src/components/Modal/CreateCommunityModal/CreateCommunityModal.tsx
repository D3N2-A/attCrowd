import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Divider,
  Flex, Icon, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack, Text
} from "@chakra-ui/react";
import {
  doc, runTransaction,
  serverTimestamp
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { GiEyeOfHorus, GiPrivateFirstClass } from "react-icons/gi";

type CreateCommunityModaProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModaProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("Public");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) {
      return;
    }
    setCommunityName(e.target.value);
  };

  //-------------------creating community------------------//
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommunityCreate = async () => {
    if (error) setError("");
    //check validity of name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length > 21) {
      setError("Community name invalid!");
      return;
    }

    setLoading(true);
    //check for duplicate
    //get ref get doc check for already existing

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      //creator id
      //created at
      //communitytype
      //number of members
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName} is already taken, Try Another`
          );
        }
        transaction.set(communityDocRef, {
          id: communityName,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });
        //set communitySnippet added as a subcollection
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("Error creating user", error);
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader
            fontSize={15}
            fontWeight={500}
            padding={3}
            display="flex"
            flexDirection="column"
          >
            Create a Community
          </ModalHeader>

          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontSize={15} fontWeight={500}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>

              <Text
                color="gray.400"
                position="relative"
                top="28px"
                left="10px"
                width="20px"
              >
                a/
              </Text>
              <Input
                _focus={{ borderColor: "black" }}
                size="sm"
                pl={6}
                value={communityName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Text
                mt={2}
                fontSize={11}
                color={communityName.length === 21 ? "red" : "gray.500"}
              >
                {21 - communityName?.length} characters left
              </Text>

              {error && (
                <Text mt={2} fontSize={11} color={"red"}>
                  {error}
                </Text>
              )}

              <Box margin="4px 0" mt={4}>
                <Text fontSize={15} fontWeight={500}>
                  Community Type
                </Text>

                <RadioGroup
                  mt={2}
                  value={communityType}
                  onChange={(e) => {
                    setCommunityType(e);
                  }}
                >
                  <Stack>
                    <Radio value="Public">
                      <Flex gap="4px" justify="center" align="center">
                        <Icon as={AiOutlineUser} fontSize="1rem" />
                        <Text fontSize="12px" fontWeight={550}>
                          Public
                        </Text>
                        <Text fontSize={10} color={"gray.500"}>
                          Anyone can view, post, and comment to this community
                        </Text>
                      </Flex>
                    </Radio>
                    <Radio value="Restricted">
                      <Flex gap="4px" justify="center" align="center">
                        <Icon as={GiEyeOfHorus} fontSize="1rem" />
                        <Text fontSize="12px" fontWeight={550}>
                          Restricted
                        </Text>
                        <Text fontSize={10} color={"gray.500"}>
                          Anyone can view this community, but only approved
                          users can post
                        </Text>
                      </Flex>
                    </Radio>
                    <Radio value="Private">
                      <Flex gap="4px" justify="center" align="center">
                        <Icon as={GiPrivateFirstClass} fontSize="1.1rem" />
                        <Text fontSize="12px" fontWeight={550}>
                          Private
                        </Text>
                        <Text fontSize={10} color={"gray.500"}>
                          Only approved users can view and submit to this
                          community
                        </Text>
                      </Flex>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="#edeff1" borderBottomRadius={10}>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={handleClose}
              height="28px"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="28px"
              onClick={() => {
                handleCommunityCreate();
              }}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
