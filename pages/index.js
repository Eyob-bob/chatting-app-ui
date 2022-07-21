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

export default function Login() {
  return (
    <div>
      <Head>
        <title>login</title>
      </Head>

      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Flex className="shadow-2xl rounded-xl p-20" direction="column">
          <Heading mb="8">Login</Heading>
          <form className="flex flex-col">
            <InputGroup>
              <Input
                variant="outline"
                mb="3"
                placeholder="Email"
                type="email"
              />
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
            </InputGroup>
            <InputGroup>
              <Input
                variant="outline"
                mb="6"
                placeholder="*******"
                type="password"
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
