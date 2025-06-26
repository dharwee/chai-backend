import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      let token;
  
      // First: Try to get token from Authorization header
      const authHeader = req.header("Authorization");
      if (
        authHeader &&
        typeof authHeader === "string" &&
        authHeader.startsWith("Bearer ")
      ) {
        token = authHeader.replace("Bearer ", "");
      }
  
      // Second: Try to get token from cookie
      if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
      }
  
      // No token found
      if (!token) {
        throw new ApiError(
          401,
          "Unauthorized: No token provided or invalid format"
        );
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?.id).select(
        "-refreshToken -password"
      );
      console.log("Decoded JWT:", decodedToken);

     



      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }
  
      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  });
  