import Head from "next/head";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";
import { login } from "../feature/user/userSlice";

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userAuthInfo = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (userAuthInfo) {
      router.push("/home");
    }
  }, [userAuthInfo]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.loginUser.token);
      dispatch(login());
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    loginUser({
      variables: { loginInput: { email, password } },
    });
  }

  if (error) {
    return router.push("/404");
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Flex className="shadow-2xl rounded-xl p-20" direction="column">
          <Heading mb="8">Login</Heading>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="outline"
                mb="3"
                placeholder="Email"
                type="email"
                required
              />
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
            </InputGroup>
            <InputGroup>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                variant="outline"
                mb="6"
                placeholder="*******"
                type="password"
                required
              />
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
            </InputGroup>
            <Button mb="3" type="submit" variant="solid" colorScheme="blue">
              Login
            </Button>
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <a className="text-blue-600 font-bold">sign up</a>
            </Link>
          </p>
        </Flex>
      </Flex>
    </div>
  );
}
