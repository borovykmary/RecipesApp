import React from "react";
import { Box } from "@chakra-ui/react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation selectedRecipesCount={0} />
      <Box as="main" py={8}>
        {children}
      </Box>
    </Box>
  );
}
