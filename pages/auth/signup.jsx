import Head from "next/head";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { login } from "../../feature/user/userSlice";
import Navbar from "../../components/navbar";

const SAVE_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      token
    }
  }
`;

export default function SignUp() {
  const userAuthInfo = useSelector((state) => state.user.value);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const [registerUser, { data, loading, error }] = useMutation(SAVE_USER);

  useEffect(() => {
    if (userAuthInfo) {
      router.push("/home");
    }
  }, [userAuthInfo]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.registerUser.token);
      dispatch(login());
      toast.closeAll();
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();

    registerUser({
      variables: { registerInput: { username, email, password } },
    });
  }

  if (error) {
    toast.closeAll();
    toast({
      title: "Error",
      description: `${error.graphQLErrors[0].message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
      variant: "left-accent",
    });
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Head>
        <title>sign up {userAuthInfo}</title>
      </Head>
      <Navbar />
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Flex className="shadow-2xl rounded-xl p-11" direction="column">
          <Heading mb="8">Sign up</Heading>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Input
              required
              variant="outline"
              mb="3"
              placeholder="name"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <InputGroup>
              <Input
                variant="outline"
                mb="3"
                placeholder="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
            </InputGroup>
            <InputGroup>
              <Input
                variant="outline"
                mb="3"
                placeholder="******"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
            </InputGroup>
            <Button type="submit" variant="solid" colorScheme="blue" mb="3">
              Sign up
            </Button>
          </form>
          <p className="text-center">
            have an account?{" "}
            <Link href="/">
              <a className="text-blue-600 font-bold">Login</a>
            </Link>
          </p>
        </Flex>
      </Flex>
    </div>
  );
}
