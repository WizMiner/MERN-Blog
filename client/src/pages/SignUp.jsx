import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react"; // Import Spinner and Alert from Flowbite React
import { Link, useNavigate } from "react-router-dom"; // Importing the Link component for navigation
import { useState } from "react"; // Import useState for state management
import OAuth from "../components/OAuth";

export default function SignUp() {
  // State variables for handling form data, error messages, and loading state
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Navigate function for page redirection

  // Handle input changes and update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields."); // Show error if any field is missing
    }

    try {
      setLoading(true); // Set loading to true when starting the request
      setErrorMessage(null); // Clear previous error message
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parse the response data
      if (data.success === false) {
        return setErrorMessage(data.message); // Show error message if request is unsuccessful
      }
      setLoading(false); // Set loading to false after the request completes
      if (res.ok) {
        navigate("/sign-in"); // Redirect to sign-in page on successful signup
      }
    } catch (error) {
      setErrorMessage(error.message); // Show error if there's an exception
      setLoading(false); // Set loading to false after catching the error
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username Input Field */}
            <div>
              <Label value="Your username" /> {/* Label for Username */}
              <TextInput
                type="text"
                placeholder="Username" // Placeholder text for input
                id="username"
                onChange={handleChange} // Handle change for username input
              />
            </div>

            {/* Email Input Field */}
            <div>
              <Label value="Your email" /> {/* Label for Email */}
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange} // Handle change for email input
              />
            </div>

            {/* Password Input Field */}
            <div>
              <Label value="Your password" /> {/* Label for Password */}
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange} // Handle change for password input
              />
            </div>

            {/* Sign-Up Button with Loading Spinner */}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> {/* Spinner icon when loading */}
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth/>
          </form>

          {/* Link to Sign-in Page */}
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage} {/* Display error message if present */}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
