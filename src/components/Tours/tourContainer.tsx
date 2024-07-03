import { Box, Flex } from '@chakra-ui/react';
import { px } from 'framer-motion';
import React, { ReactNode } from 'react'
interface Props{
    children : ReactNode;
}
const tourContainer = ({children} : Props) => {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={{base: "white", sm: "grey.100"}}
    >
      <Box
        padding={8}
        boxShadow={{sm:"lg"}}
        borderRadius="md"
        bg={'white'}
        maxWidth="450px"
        width="100%"
      >
        {children}
      </Box>
    </Flex>
  );
}

export default tourContainer;