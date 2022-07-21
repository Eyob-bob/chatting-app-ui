import { SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "../feature/user/userSlice";

export default function Navbar({ children }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="shadow-lg py-2 fixed top-0 w-full bg-white">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="80%"
          margin="auto "
        >
          <Link href="/home">
            <a>
              <Image src="/images/chatnow.png" width="90px" height="50px" />
            </a>
          </Link>
          <Flex gap="2rem" justifyContent="center" alignItems="center">
            <IconButton icon={<SunIcon />}></IconButton>
            <Menu>
              <MenuButton variantColor="pink">
                <Avatar src="/images/profile.jpg" size="sm" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  );
}
