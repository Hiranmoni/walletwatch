"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="container flex items-center justify-between border-b-2 min-h-16">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={150} height={70} priority />
      </Link>
      <SignedIn>
        <div className="flex items-center gap-2">
          <span className="hidden md:block">{user?.fullName}</span>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "size-12",
              },
            }}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
