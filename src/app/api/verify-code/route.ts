import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request){
    await dbConnect()

    try {
   const {username, code} = await request.json()
   const decodedUsername = decodeURIComponent(username)
   
  const user = await UserModel.findOne({username:decodedUsername})

  if(!user){
    return Response.json({
     success:false,
     message:"User not found"
    },
    {status:400})
       }
    
    if(user.isVerified){
         return Response.json({
     success:false,
     message:"User account already Verified"
    },
    {status:400})
    }
    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

    if(isCodeValid && isCodeNotExpired){
        user.isVerified =true;
        await user.save()
         return Response.json({
     success:true,
     message:"Account Verified successfully"
        },{status:200})
    } else if(!isCodeNotExpired){
         return Response.json({
     success:false,
     message:"verification code has expired, please signup again to get a new code"
    },
    {status:400})
    } else{
         return Response.json({
     success:false,
     message:"verification code incorrect"
    },
    {status:400})
    }

    } catch (error) {
         console.log("Error verifying username", error)
        return Response.json({
            success:false,
            message:'Error verifying username'
            },
        {status:500})
    }
}