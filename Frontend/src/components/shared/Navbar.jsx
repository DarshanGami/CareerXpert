import { Popover, PopoverContent } from "@radix-ui/react-popover";
import React from "react";
import { PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="object-cover rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4 ">
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="object-cover rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Ajay Chovatiya</h4>
                    <p className="text-sm text-muted-foreground">
                      lorem ipsum dolor site
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />

                    <Button
                      variant="link"
                      className="px-2 py-1 rounded-lg border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                      style={{ border: "none", boxShadow: "none" }}
                    >
                      view profile
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      className="px-2 py-1 rounded-lg border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                      style={{ border: "none", boxShadow: "none" }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
