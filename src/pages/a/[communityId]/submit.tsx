import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/PostForm/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const submit: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box
          p="14px 0px"
          borderBottom="1px solid"
          borderColor="white"
          mt="1rem"
        >
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>RHS</>
    </PageContent>
  );
};
export default submit;
