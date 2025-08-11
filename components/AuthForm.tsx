"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";



// import FormField from "@/components/FormFeild";
import { authClient } from "@/lib/auth.client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./FormFeild";

// Define FormType to allow all flows


const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'signUp' ? z.string().min(2).max(100) : z.string().optional(),
    email: type === 'signIn' || type === 'signUp' || type === 'forgotPassword' ? z.string().min(2).max(100).email() : z.string().optional(),
    password: type === 'forgotPassword' ? z.string().optional() : z.string().min(6).max(100),
    confirmPassword: type === 'resetPassword' ? z.string().min(6, "Password must be at least 6 characters") : z.string().optional(),
  });
};

export function AuthForm({type, onReset}: {type: FormType, onReset?: (password: string) => Promise<any>}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    try {
      if (type === "signUp") {
        const result = await authClient.signUp.email({
          name: values.name ?? "",
          email: values.email,
          password: values.password ?? "",
        })

         if (result.error) {
             toast.error(result.error?.message || "Sign up failed.");
               return;
         }

         toast.success("Account created successfully! Please sign in.");
         router.push("/signIn");
       } else if(type === "signIn") {
         const result = await authClient.signIn.email({
               email: values.email,
               password: values.password ?? "",
           })

          if (result.error) {
              toast.error("Failed to sign in. Please check your credentials.");
              return;
          }
              toast.success("Signed in successfully!");
               router.push("/");
         } else if(type === "forgotPassword") {
       
        // Call password reset request
        const result = await authClient.forgetPassword({
          email: values.email,
        
        });
        console.log('Password reset result:', result);
        if (result.error) {
          toast.error(result.error?.message || "Failed to send reset link.");
          return;
        }
        toast.success("Password reset link sent! Check your email.");
        router.push("/signIn"); 
      } else if (type === "resetPassword") {
            const result = await authClient.resetPassword({
              token,
              newPassword: values.password,
            }); 
        if (result.error) {
          toast.error(result.error?.message || "Failed to reset password.");
          return;
        }
        toast.success("Password reset successfully! You can now sign in.");
        router.push("/signIn");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }



    const isSignIn = type === "signIn";
    const isForgotPassword = type === "forgotPassword";
    const isResetPassword = type === "resetPassword";

    const handleSignInWithGoogle = async () => {
        return await authClient.signIn.social({
            provider: "google",
        });
    }
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Ai-Web-App</CardTitle>
        <CardDescription className="text-center">
          {isForgotPassword
            ? "Reset your password"
            : isResetPassword
            ? "Set a new password"
            : "AI Web App For All Your Needs And More"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {isForgotPassword ? (
              <>
                <FormField
                  name="email"
                  control={form.control}
                  placeholder="Enter your email"
                  label="Email"
                  type="email"
                />
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </>
            ) : isResetPassword ? (
              <>
                <FormField
                  name="password"
                  control={form.control}
                  placeholder="Enter new password"
                  label="New Password"
                  type="password"
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  placeholder="Confirm new password"
                  label="Confirm Password"
                  type="password"
                />
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                {!isSignIn && (
                  <FormField
                    name="name"
                    control={form.control}
                    placeholder="Enter your name"
                    label="Name"
                    type="text"
                  />
                )}
                <FormField
                  name="email"
                  control={form.control}
                  placeholder="Enter your email"
                  label="Email"
                  type="email"
                />
                <FormField
                  name="password"
                  control={form.control}
                  placeholder="Enter your password"
                  label="Password"
                  type="password"
                />
                {isSignIn && (
                  <div className="flex justify-end px-2 text-sm">
                    <Link href="/forgot-password" className="font-semibold">
                      Forgot your password?
                    </Link>
                  </div>
                )}
                <Button type="submit" className="w-full">
                  {isSignIn ? "Sign In" : "Create An Account"}
                </Button>
              </>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex items-center justify-center gap-2 text-gray-700 text-sm">
          <span>{isSignIn ? 'Create an account?' : 'Already have an account?'}</span>
          <Link
            href={isSignIn ? "/signUp" : "/signIn"}
            className="font-semibold text-blue-600 hover:underline transition-colors"
          >
            {isSignIn ? 'Register' : 'Login'}
          </Link>
        </div>
        {(isSignIn || type === "signUp") && (
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-xs">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          )}
        {(isSignIn || type === "signUp") && (
          <Button variant="outline" className="w-full mt-2" onClick={handleSignInWithGoogle}>
            <FcGoogle className="inline mr-1" />
            Continue with Google
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}



