import useForgotPassword from "@/api/auth/ForgotPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const { error, isLoading, forgotPasswordReq } = useForgotPassword();

  const [formData, setFormData] = useState({
    email: "",
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
    forgotPasswordReq(formData);
  };

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px] sm:w-[450px] md:w-[550px] p-5">
        <CardHeader>
          <NavLink to={"/"} className={"mx-auto"}>
            <img src="@/../images/logo.svg" alt="LOGO" />
          </NavLink>
          <CardTitle className="text-center">Forgot Password</CardTitle>
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
                <Button type="submit" disabled={isLoading}>
                  Send Reset Link
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
            Know your password?{" "}
            <NavLink to="/sign-in" className={"underline"}>
              Sign In
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
