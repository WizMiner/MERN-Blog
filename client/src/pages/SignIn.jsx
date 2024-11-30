// Import necessary components and hooks from libraries
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"; // UI components from Flowbite
import { useState } from "react"; // React hook for state management
import { Link, useNavigate } from "react-router-dom"; // React Router components for navigation

export default function SignIn() {
  // State for managing form data, error messages, and loading state
  const [formData, setFormData] = useState({}); // Stores user input for email and password
  const [errorMessage, setErrorMessage] = useState(null); // Stores error messages to display to the user
  const [loading, setLoading] = useState(false); // Indicates whether the sign-in process is loading
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handles changes in input fields and updates formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Updates formData with input values
  };

  // Handles form submission for sign-in
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!formData.email || !formData.password) {
      // Checks if all required fields are filled
      return setErrorMessage("Please fill out all fields."); // Displays error if fields are empty
    }
    try {
      setLoading(true); // Sets loading state to true
      setErrorMessage(null); // Resets error message state
      const res = await fetch("/api/auth/signin", {
        // Sends POST request to the sign-in API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Sets content type to JSON
        body: JSON.stringify(formData), // Sends form data as JSON
      });
      const data = await res.json(); // Parses the JSON response
      if (data.success === false) {
        // Checks if the API response indicates failure
        return setErrorMessage(data.message); // Displays error message from API
      }
      setLoading(false); // Stops loading state
      if (res.ok) {
        // If the response status is OK, navigate to the home page
        navigate("/");
      }
    } catch (error) {
      // Catches any errors during the request
      setErrorMessage(error.message); // Displays error message
      setLoading(false); // Stops loading state
    }
  };

  // JSX for rendering the sign-in component
  return (
    <div className="min-h-screen mt-20">
      {" "}
      {/* Sets minimum height and margin for the container */}
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {" "}
        {/* Container for the form and intro text */}
        {/* Left Section: Intro text */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Blog of
            </span>
            Developers
          </Link>
          <p className="mt-5 text-sm">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* Right Section: Sign-in form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {" "}
            {/* Form for sign-in */}
            <div>
              <Label value="Your email" /> {/* Label for email input */}
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange} // Updates state on input change
              />
            </div>
            <div>
              <Label value="Your password" /> {/* Label for password input */}
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange} // Updates state on input change
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink" // Button styling
              type="submit"
              disabled={loading} // Disables button while loading
            >
              {loading ? (
                <>
                  {" "}
                  {/* Shows spinner while loading */}
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In" // Button text
              )}
            </Button>
          </form>

          {/* Link to the sign-up page */}
          <div className="flex gap-2 mt-5 text-sm">
            <span>Dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {/* Error message display */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
