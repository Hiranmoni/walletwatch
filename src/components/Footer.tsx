import Image from "next/image";
import BottomNavbar from "./BottomNavbar";

const Footer = () => {
  return (
    <footer className="container border-t-2 border-indigo-200 mb-16 md:mb-0 py-2">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="hidden md:flex justify-center text-teal-600 sm:justify-start">
          <Image src="/logo.png" alt="logo" width={150} height={70} />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          IT 'A' Level Project | Hiranmoni Baruah
        </p>
      </div>
      <div className="md:hidden">
        <BottomNavbar />
      </div>
    </footer>
  );
};

export default Footer;
