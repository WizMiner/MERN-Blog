import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-4">
      <Link
        to="/"
        className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white"
      >
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Minte Blog
        </span>
      </Link>

      {/* Search bar */}

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      {/* small screen search button */}

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* moon icons */}

      <div className="flex gap-2 md:order-2">
        <Button className="hidden w-12 h-10 sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
      </div>

      <Navbar.Collapse>
        <Link
          to="/"
          className={`${
            path === "/" ? "text-blue-600" : "text-gray-700 dark:text-white"
          } hover:text-gray-900 dark:hover:text-gray-400`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${
            path === "/about"
              ? "text-blue-600"
              : "text-gray-700 dark:text-white"
          } hover:text-gray-900 dark:hover:text-gray-400`}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={`${
            path === "/projects"
              ? "text-blue-600"
              : "text-gray-700 dark:text-white"
          } hover:text-gray-900 dark:hover:text-gray-400`}
        >
          Projects
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
