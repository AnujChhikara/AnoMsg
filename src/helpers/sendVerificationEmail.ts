import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/Types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Nextjs App Verification code',
            react: VerificationEmail({username, otp:verifyCode}),})
        
         return{ success:true, message:"Verification email send successfully"}
    } catch (emailError) {
        console.log("Error sending verification email",emailError)
        return{ success:false, message:"failed to send verification email"}
    } }
