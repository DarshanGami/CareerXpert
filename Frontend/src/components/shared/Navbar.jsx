import { Popover, PopoverContent } from "@radix-ui/react-popover";
import React from "react";
import { PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        <div>
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent></PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
