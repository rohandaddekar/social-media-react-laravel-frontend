import useResetPassword from "@/api/auth/ResetPassword";
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
import { NavLink, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { error, isLoading, resetPasswordReq } = useResetPassword();

  const [formData, setFormData] = useState({
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
    resetPasswordReq({ ...formData, token });
  };

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[350px] sm:w-[450px] md:w-[550px] p-5">
        <CardHeader>
          <NavLink to={"/"} className={"mx-auto"}>
            <img src="@/../../images/logo.svg" alt="LOGO" />
          </NavLink>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  error={error?.errors?.password?.[0]}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  onChange={onChangeHandler}
                  error={error?.errors?.password_confirmation?.[0]}
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

export default ResetPassword;
