import { cn } from "@/lib/utils";
// import React from "react";
import { Button } from "./button";
import { TypewriterEffect } from "./typewriter-effect";
import { Link } from "react-router";

    const words = [
    {
      text: "Save",
    },
    {
      text: "organize",
    },
    {
      text: "and",
    },
    {
      text: "rediscover",
    },
    {
     text:"ideas",
    },
    {
     text:"ideas",
    },
    {
      text: "effortlessly.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
export function GridSmallBackgroundDemo() {
  return (
    <div className="relative flex h-[45rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="text-center z-20 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
               <span className="text-primary">Orbix</span> create and grow .
            </h1>
            <p className="text-xl  mb-8 max-w-2xl mx-auto text-pretty text-gray-700">
            <TypewriterEffect words={words} /> 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="">
              <Button size="lg" className="text-lg px-8 cursor-pointer">
               Discover Your Flow
              </Button>
              </Link>
            
            </div>
          </div>
    </div>
  );
}
