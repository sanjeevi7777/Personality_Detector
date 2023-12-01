import React, { useState } from 'react';
import logo from '../assets/depression.png';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
}
const Links = ['Home', 'About', 'Feedback',];
const Links1 = ['Home', 'About', 'Feedback','SignUp','Login'];
const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
const navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isNavOpen, setNavOpen] = useState(false); // State for responsive navigation
  const toggleNav = () => {setNavOpen(!isNavOpen);navigate('/login')};
  const toggleNav1 = () => {setNavOpen(!isNavOpen);navigate('/signup')};
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box display={'flex'}>
              <img src={logo} alt='logo' width={50} />
              <Text mt={2} fontFamily={'fantasy'} fontSize={'2xl'}>&nbsp;Persona<span style={{color:'teal'}}>Scan</span></Text>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Button  key={link} variant={'link'} padding={5} >{link}</Button>
              ))}
            </HStack>
          </HStack>
          <HStack alignItems={'center'} spacing={10}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Button
              variant={'link'}
              colorScheme={'teal'}
              size={'sm'}
              display={{ base: 'none', md: 'block' }} // Responsive display
              onClick={toggleNav1}
            >
              SignUp
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              display={{ base: 'none', md: 'block' }} // Responsive display
              onClick={toggleNav}
            >
              Login
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Box textAlign="center">
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Box>
                <br />
                <Center>
                  <Text>Username</Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {isOpen || isNavOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links1.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
