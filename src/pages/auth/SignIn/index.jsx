import useSignIn from "@/api/auth/SignIn";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  const { error, isLoading, signInReq } = useSignIn();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    signInReq(formData);
  };

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px] sm:w-[450px] md:w-[550px] p-5">
        <CardHeader>
          <NavLink to={"/"} className={"mx-auto"}>
            <img src="@/../images/logo.svg" alt="LOGO" />
          </NavLink>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Welcome Back.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={onChangeHandler}
                  error={error?.errors?.email?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={onChangeHandler}
                  error={error?.errors?.password?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-right underline"
                >
                  Forgot Password?
                </NavLink>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit" disabled={isLoading}>
                  Sign In
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
            Don&apos;t have an account?{" "}
            <NavLink to="/sign-up" className={"underline"}>
              Sign Up
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
