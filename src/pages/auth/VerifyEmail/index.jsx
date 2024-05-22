/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifyEmail from "@/api/auth/Email/VerifyEmail";
import useResendEmailToken from "@/api/auth/Email/ResendEmailToken";
import { Input } from "@/components/ui/input";

const VerifyEmail = () => {
  const location = useLocation();
  const { isLoading: isLoadingVerifyEmail, verifyEmailReq } = useVerifyEmail();
  const {
    data: dataResendEmailToken,
    isLoading: isLoadingResendEmailToken,
    resendEmailTokenReq,
  } = useResendEmailToken();

  const queryParams = new URLSearchParams(location.search);
  const queryEmail = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (dataResendEmailToken) {
      setTimer(60);
    }
  }, [dataResendEmailToken]);

  const submitHandler = (e) => {
    e.preventDefault();

    verifyEmailReq({
      email: queryEmail,
      token: otp,
    });
    setOtp("");
  };

  const resendEmailTokenHandler = (e) => {
    e.preventDefault();

    resendEmailTokenReq({
      email: queryEmail,
    });
    setOtp("");
  };

  return (
    <>
      <div className="container min-h-screen flex flex-col items-center justify-center">
        <Card className="w-[350px] p-5">
          <CardHeader>
            <NavLink to={"/"} className={"mx-auto"}>
              <img src="@/../images/logo.svg" alt="LOGO" />
            </NavLink>
            <CardTitle className="text-center">Verify Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    value={queryEmail}
                    disabled
                    className="bg-gray-200"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button
                    type="submit"
                    disabled={isLoadingVerifyEmail || otp.length < 6}
                  >
                    Verify Email
                    {isLoadingVerifyEmail && (
                      <Loader2 className="animate-spin ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-between">
            <p className="w-full text-center text-sm mb-3">
              Didn&apos;t recieved OTP?
            </p>
            <Button
              type="button"
              disabled={isLoadingResendEmailToken || timer > 0}
              className="w-full"
              variant="outline"
              onClick={resendEmailTokenHandler}
            >
              {timer > 0 ? `Resend OTP in (${timer} sec)` : "Resend OTP"}
              {isLoadingResendEmailToken && (
                <Loader2 className="animate-spin ml-2 h-4 w-4" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default VerifyEmail;
