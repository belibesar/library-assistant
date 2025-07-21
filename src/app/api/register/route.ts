import UserModel from "@/db/models/UserModel";
import errHandler from "@/utils/errHandler";

export async function POST(request: Request){
    try {      
        const res = await request.json();
        console.log("Received registration data:", res);
        
        const result = await UserModel.create(res);
        console.log(result, 'result');
        
        console.log("User created successfully:", result);
        
        return Response.json({
            message: "Success register user",
            success: true
        });
    } catch (error) {
        console.error("Registration error:", error);
        
        if (error instanceof Error && error.message.includes('ENOTFOUND')) {
            return Response.json({
                message: "Database connection failed. Please check your internet connection.",
                success: false
            }, { status: 500 });
        }
        
        return errHandler(error);
    }
}