// import React from 'react'

import { Footer } from "@/components/ui/footer-view";
import Navabar from "./navabar-view";
import { Share2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";
import { GridSmallBackgroundDemo } from "@/components/ui/background-view";
import { FAQ } from "@/components/ui/faq-view";
export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto w-full ">
        <Navabar />
        <GridSmallBackgroundDemo />
        <section className=" px-4  py-2  ">
         <div className="text-center mb-16">
  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
    <span className="text-primary">Everything</span> you need to organize your thoughts
  </h2>
  <p className="text-xl font-medium text-gray-900 dark:text-gray-300">
    Built with <span className="text-primary font-semibold">Orbix</span>  your second brain in the cloud
  </p>
</div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="  p-8 rounded-2xl border border-neutral-300 transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6">
                <Bookmark className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Save Anything
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Add bookmarks, videos, posts.
              </p>
            </div>
            <div className="bg-white border border-neutral-300  dark:bg-gray-900 p-8 rounded-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Global search and smart tags help you recall anything instantly.
              </p>
            </div>
            <div className="bg-white border border-neutral-300 dark:bg-gray-900 p-8 rounded-2xl  transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6">
                <Share2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Share Easily
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Share notes and links with friends—or keep them private.
              </p>
            </div>
          </div>
        </section>
        <section className=" py-5 px-4 ">
          <div className="mx-auto px-2">
            <h2 className="text-xl p-3 sm:text-3xl lg:text-4xl font-bold text-gray-950">FAQ<span className="text-primary">?</span></h2>
            <FAQ />
          </div>
        </section>
      </div>
      <div className="bg-primary rounded-t-4xl text-neutral-100  py-12  mt-12 ">
        <Footer />
      </div>
    </div>
  );
}
