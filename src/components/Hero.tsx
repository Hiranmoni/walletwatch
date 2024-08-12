import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="container bg-gray-900 text-white">
        <div className="py-24 lg:py-32 lg:flex">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Manage Your Expenses.
              <br /> <br />
              Control Your Money.
            </h1>

            <p className="mx-auto mt-4 max-w-4xl sm:text-xl/relaxed">
              Achive your financial goals with this simple and easy tool. Start
              creating your budget and keep track of your spending. Take full
              control of your hard-earned money.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Visit Dashboard
              </Link>
              <Link
                className="block w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/sign-up"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="md:-mt-24">
        <Image
          src={"/dashboard.png"}
          alt="hero"
          width={1000}
          height={558}
          priority
          className="hidden lg:block h-full mx-auto rounded-xl object-cover shadow-xl"
        />
      </div>
    </>
  );
};

export default Hero;
