import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(
    (state) => state.user || { loading: false, error: null }
  ); // Provide a default value
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Updates formData with input values
  };

  // Handles form submission for sign-in
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!formData.email || !formData.password) {
      // Checks if all required fields are filled
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        // Sends POST request to the sign-in API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
