import { CustomError } from "@/types";
import { ZodError } from "zod";

export default function errHandler(err: unknown) {
   let message = (err as CustomError).message || "Internal Server Error";
   let status = (err as CustomError).status || 500;

   // Handle Zod validation errors
   if (err instanceof ZodError) {
      status = 400;
      message = err.errors.map(el => `${el.message}`).join(", ");
   }

   // Log error for debugging in development
   if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', err);
   }

   return Response.json({
      message
   }, {
      status
   });
}