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




import { useRouter } from "next/navigation";
import { z } from "zod";
import FormField from "./FormFeild";

const AuthFormSchema = (type: FormType) => {
  return z.object({
      name: type === 'signUp' ? z.string().min(2).max(100) : z.string().optional(),
    email: z.string().min(2).max(100).email(),
    password: z.string().min(6).max(100),
  });
};


export function AuthForm({type}: {type: FormType}) {
      const router = useRouter()
     const formSchema = AuthFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
 if(type === "signUp") {
         router.push('/signIn')
         console.log("Signing in with values:", values);
       
       } else {
                router.push("/")
         console.log("Signing up with values:", values);
       }
    console.log(values)
    }catch (error) {
      console.error("Error during form submission:", error);
    }
      
  }

    const isSignIn = type === "signIn";
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ai-Web-App</CardTitle>
        <CardDescription>
           AI Web App For All Your Needs And More
        </CardDescription>
    
      </CardHeader>
      <CardContent>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 {!isSignIn && (<FormField 
                   name="name"
                   control={form.control}
                   placeholder="Enter your name"
                   label="Name"
                   type="text" />)}
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
                  
                  <Button type="submit" className="w-full">
                    {isSignIn ? "Sign In" : "Create An Account"}
                  </Button>
                </form>
              </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-center text-gray-700">{isSignIn ? 'Create an account?' : 'Already have an account?'}
              <Link href={isSignIn ? "/signUp" : "/signIn"} className="font-semibold ml-1">
                {isSignIn ? 'Register' : 'Login'}
              </Link>
        </p>
         
         <div>
            <p className="text-center text-gray-700">Or</p> 
            <Button variant="outline" className="w-full mt-2">
               Continue with Google
            </Button>
          
         </div>
        
      </CardFooter>
    </Card>
  )
}
