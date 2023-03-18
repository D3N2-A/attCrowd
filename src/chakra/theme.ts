import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";
import "@fontsource/ibm-plex-sans";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FE6F2B",
    },
  },
  fonts: {
    body: "IBM Plex Sans, Arial,sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});
