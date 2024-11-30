import { Button, Label, TextInput } from "flowbite-react"; // Importing reusable components from Flowbite React library
import { Link } from "react-router-dom"; // Importing the Link component for navigation

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      {/* Container for the sign-up form */}
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* Left Section */}
        <div className="flex-1">
          {/* Logo and Link to Homepage */}
          <Link to="/" className="text-4xl font-bold dark:text-white">
            {/* Gradient-styled branding text */}
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Blog of
            </span>{" "}
            Developers
          </Link>

          {/* Description below the logo */}
          <p className="mt-5 text-sm">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          {/* Sign-up Form */}
          <form className="flex flex-col gap-4">
            {/* Username Input Field */}
            <div>
              <Label value="Your username" /> {/* Label for Username */}
              <TextInput
                type="text"
                placeholder="Username" // Placeholder text for input
                id="username"
              />
            </div>

            {/* Email Input Field */}
            <div>
              <Label value="Your email" /> {/* Label for Email */}
              <TextInput
                type="text"
                placeholder="name@company.com" // Placeholder text for input
                id="email"
              />
            </div>

            {/* Password Input Field */}
            <div>
              <Label value="Your password" /> {/* Label for Password */}
              <TextInput
                type="text"
                placeholder="Password" // Placeholder text for input
                id="password"
              />
            </div>

            {/* Submit Button */}
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>

          {/* Link to Sign-in Page */}
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
