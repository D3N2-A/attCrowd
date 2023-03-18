import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/PostForm/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const submit: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <>RHS</>
    </PageContent>
  );
};
export default submit;
