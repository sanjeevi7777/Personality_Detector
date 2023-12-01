import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react';

export default function App() {
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate a 2-second delay before showing the card
    const delay = setTimeout(() => {
      setShowCard(true);
    }, 300);

    return () => clearTimeout(delay);
  }, []);

  // Define color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const linkColor = useColorModeValue('blue.400', 'blue.200');
  const buttonColor = useColorModeValue('white', 'white');

  const handleSignIn = () => {
    setIsLoading(true);

    // Simulate a 2-second delay for sign-in
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      {showCard ? (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={bgColor}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={textColor}>
                to enjoy all of our cool <Text color={linkColor}>features</Text> ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={cardBgColor}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={linkColor}>Forgot password?</Text>
                  </Stack>
                  <Button
                   bg={'teal'}
                    isLoading={isLoading}
                    loadingText="Signing In"
                    b={linkColor}
                    color={buttonColor}
                    _hover={{
                      bg: 'teal.500',
                    }}
                    onClick={handleSignIn}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner size="md" color="teal" />
          <p > &nbsp;Loading...</p>
        </div>
      )}
    </div>
  );
}
