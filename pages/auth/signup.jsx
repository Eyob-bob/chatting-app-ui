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
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SignUp() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  });

  return (
    <div>
      <Head>
        <title>sign up</title>
      </Head>

      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Flex className="shadow-2xl rounded-xl p-11" direction="column">
          <Heading mb="8">Sign up</Heading>
          <form className="flex flex-col">
            <Input
              required
              variant="outline"
              mb="3"
              placeholder="name"
              type="text"
            />
            <InputGroup>
              <Input
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
                variant="outline"
                mb="3"
                placeholder="******"
                type="password"
                required
              />
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
            </InputGroup>
            <Input
              type="file"
              variant="outline"
              mb="6"
              placeholder="profile picture"
            />
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
