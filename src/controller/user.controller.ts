import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../model/user.model";
import config from "../config";

// Register user
const register = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const savedUser = await User.create(req.body);

    // Generate token
    const token = jwt.sign(
      { _id: savedUser._id, email: savedUser.email, role: savedUser.role },
      config.jwt_secret as Secret,
      { expiresIn: config.jwt_expires_in as any },
    );

    // Omit password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
};

// Login user
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password as string,
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      config.jwt_secret as Secret,
      { expiresIn: config.jwt_expires_in as any },
    );

    // Omit password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: userResponse,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: err.message,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    const decoded = jwt.verify(token, config.jwt_secret as Secret) as {
      email: string;
      role: string;
    };

    const newToken = jwt.sign(
      { email: decoded.email, role: decoded.role },
      config.jwt_secret as Secret,
      { expiresIn: config.jwt_expires_in as any },
    );

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: err.message,
    });
  }
};

// Update user
const updateUser = async (req: Request, res: Response) => {
  try {
    // password direct update করতে দেওয়া যাবে না
    const { password, role, ...updateData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

// Update user role (admin only)
const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: err.message,
    });
  }
};

export const userControllers = {
  register,
  login,
  refreshToken,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
};

// ## Query examples যেগুলো এখন কাজ করবে
// ```
// GET /api/items?search=phone
// GET /api/items?category=electronics
// GET /api/items?priceMin=10&priceMax=100
// GET /api/items?rating=4
// GET /api/items?sort=price        → price low to high
// GET /api/items?sort=-rating      → rating high to low
// GET /api/items?sort=-createdAt   → newest first
// GET /api/items?page=2&limit=10
// ```

// এগুলো সব একসাথেও কাজ করবে:
// ```
// GET /api/items?search=phone&category=electronics&priceMin=50&sort=-rating&page=1&limit=10
