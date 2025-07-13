import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return Response.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return Response.json({ message: "JWT secret not configured" }, { status: 500 });
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Return user data from token
    return Response.json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      username: decoded.username
    });

  } catch (error) {
    console.error("Token verification error:", error);
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}
