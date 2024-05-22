import useSignUp from "@/api/auth/SignUp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const { error, isLoading, signUpReq } = useSignUp();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signUpReq(formData);
  };

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px] sm:w-[450px] md:w-[550px] p-5">
        <CardHeader>
          <NavLink to={"/"} className={"mx-auto"}>
            <img src="@/../images/logo.svg" alt="LOGO" />
          </NavLink>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Firstname"
                  name="first_name"
                  onChange={onChangeHandler}
                  error={error?.errors?.first_name?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Lastname"
                  name="last_name"
                  onChange={onChangeHandler}
                  error={error?.errors?.last_name?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  name="email"
                  onChange={onChangeHandler}
                  error={error?.errors?.email?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  error={error?.errors?.password?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                  onChange={onChangeHandler}
                  error={error?.errors?.password_confirmation?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit" disabled={isLoading}>
                  Sign Up
                  {isLoading && (
                    <Loader2 className="animate-spin ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="w-full text-sm text-center">
            Already have an account?{" "}
            <NavLink to="/sign-in" className={"underline"}>
              Sign In
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
