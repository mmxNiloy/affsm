"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/app/providers/UserContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icons from "../Icons";
import { useRouter } from "next/navigation";
import { User } from "@/util/types";

const LoginForm = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  // Student ID
  const [sid, setSID] = useState<number>(0);
  const [sidError, setSIDError] = useState<string | undefined>(undefined);

  // Evaluator email
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  // Password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const [userType, setUserType] = useState(UserTypes.STUDENT);
  const [openFailureDialog, setOpenFailureDialog] = useState(false);

  // Login failure API results
  const [failureResponse, setFailureResponse] = useState<any>();

  const loginStudent = async () => {
    const apiRes = await fetch("/api/auth/login/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: sid,
        password,
      }),
    });

    if (apiRes.ok) {
      // Login successful, redirect to /dashboard
      const verRes = await fetch("/api/auth/verify");
      if (verRes.ok) {
        const userData = (await verRes.json()) as { user: User };
        setUser(userData.user);

        console.log("User data", userData);

        router.replace("/dashboard");
      } else {
        setOpenFailureDialog(true);
        setFailureResponse(await apiRes.json());
      }
    } else {
      setOpenFailureDialog(true);
      setFailureResponse(await apiRes.json());
    }
  };

  const loginEvaluator = async () => {
    const apiRes = await fetch("/api/auth/login/evaluator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (apiRes.ok) {
      const verRes = await fetch("/api/auth/verify");
      if (verRes.ok) {
        const userData = (await verRes.json()) as { user: User };
        setUser(userData.user);

        router.replace("/dashboard/admin");
      } else {
        setOpenFailureDialog(true);
        setFailureResponse(await apiRes.json());
      }
    } else {
      setOpenFailureDialog(true);
      setFailureResponse(await apiRes.json());
    }
  };

  const handleLoginButtonClick = async () => {
    setLoading(true);
    try {
      if (userType === UserTypes.STUDENT) {
        await loginStudent();
      } else await loginEvaluator();
    } catch (ignored) {
      console.log("Failed to login");
    }

    setLoading(false);
  };

  const handleSIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const id = Number.parseInt(e.target.value);

      if (id > 9999_9999 || id < 0) {
        return;
      }

      setSID(id);
      setSIDError(undefined);
    } catch (error) {
      setSIDError("Student ID must be a positive integer.");
    }
  };

  const validateEmail = (em: string) => {
    return String(em)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const em = e.target.value.trim();
    setEmail(em);

    if (validateEmail(em)) {
      setEmailError(undefined);
    } else setEmailError("Invalid email address.");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value.trim();
    setPassword(pass);
    if (pass.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else setPasswordError(undefined);
  };

  const handleUserTypeChange = () => {
    const nextUser = getNextUserType();

    setUserType(nextUser);
  };

  const getNextUserType = () => {
    if (userType === UserTypes.STUDENT) return UserTypes.EVALUATOR;
    else return UserTypes.STUDENT;
  };

  useEffect(() => {
    if (user) {
      if (user.roles) router.replace("/dashboard/admin");
      else router.replace("/dashboard");
    } else router.replace("/");
  }, [user, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to AFFSM</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-2">
          <div
            className={`flex-col gap-1 ${
              userType === UserTypes.STUDENT ? "flex" : "hidden"
            }`}
          >
            <Label htmlFor="input-sid">Student ID</Label>
            <Input
              onChange={handleSIDChange}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              id="input-sid"
              type="number"
              placeholder="Student ID"
            />
            {sidError && (
              <p className="text-red-700 text-xs md:text-sm">{sidError}</p>
            )}
          </div>

          <div
            className={`flex-col gap-1 ${
              userType === UserTypes.STUDENT ? "hidden" : "flex"
            }`}
          >
            <Label htmlFor="input-email">Email</Label>
            <Input
              id="input-email"
              type="email"
              onChange={handleEmailChange}
              placeholder="Email"
            />
            {emailError && (
              <p className="text-red-700 text-xs md:text-sm">{emailError}</p>
            )}
          </div>

          <div className="flex-col gap-1">
            <Label htmlFor="input-password">Password</Label>
            <div className="flex flex-row gap-2">
              <Input
                onChange={handlePasswordChange}
                id="input-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Icons.hidden /> : <Icons.visible />}
              </Button>
            </div>

            {passwordError && (
              <p className="text-red-700 text-xs md:text-sm">{passwordError}</p>
            )}
          </div>

          {/* Form buttons */}
          <Button
            className="flex flex-row gap-1 w-full"
            type="button"
            disabled={
              ((Boolean(sidError) || Boolean(emailError)) &&
                Boolean(passwordError)) ||
              loading
            }
            onClick={handleLoginButtonClick}
          >
            {loading ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.login />
            )}
            Login
          </Button>
          <Button
            className="flex flex-row gap-1 w-full"
            type="button"
            variant={"secondary"}
            onClick={handleUserTypeChange}
          >
            {userType !== UserTypes.STUDENT ? (
              <Icons.student />
            ) : (
              <Icons.admin />
            )}
            Login as {userType !== UserTypes.STUDENT ? "Student" : "Evaluator"}
          </Button>
        </form>
      </CardContent>

      {/* Failure dialog */}
      <AlertDialog open={openFailureDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Failed</AlertDialogTitle>
            <AlertDialogDescription>
              Failed to login.
              <br />
              Reason: {failureResponse?.result?.name} <br />
              {/* TODO: Show a stack trace? */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenFailureDialog(false)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

const UserTypes = {
  STUDENT: "student",
  EVALUATOR: "evaluator",
  STUDENT_ID_LABEL: "Student ID",
  EVALUATOR_ID_LABEL: "Evaluator ID",
};

export default LoginForm;
