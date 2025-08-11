import { sendEmail } from "@/app/email/sendEmail";
import { sendResetPasswordEmail } from "@/app/email/sendResetPasswordEmail";
import { db } from "@/drizzle/db";
import { schema } from "@/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({

       
        
       emailVerification: {
       sendVerificationEmail: async ( { user, url } ) => {
       await sendEmail(url, user);
    },
  },
       emailAndPassword: { 
       enabled: true, 
       autoSignIn:false,
      //  minPasswordLength:6,
       requireEmailVerification:true,
       sendResetPassword: async ({user, url, token}) => {
        await sendResetPasswordEmail(url, user, token);

      

    },
   
  },
    database: drizzleAdapter(db,{
        provider:'pg',
        schema,
    }),
     socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
     },

     
     plugins: [nextCookies()],
     baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
})



