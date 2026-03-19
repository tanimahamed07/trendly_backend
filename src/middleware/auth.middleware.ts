import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Header থেকে token নাও
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token not found",
        });
      }

      // Token verify করো
      const decoded = jwt.verify(token, config.jwt_secret as Secret) as {
        _id: string;
        email: string;
        role: "user" | "admin";
      };

      // Role check করো
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized",
        });
      }

      // req.user এ রাখো
      req.user = decoded;

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: err.message,
      });
    }
  };
};