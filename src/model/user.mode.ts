import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "../types/user.interface";
import config from "../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "manager", "admin"], default: "user" },
    avatar: { type: String },
  },
  { timestamps: true },
);

// Pre-save: মঙ্গুস ৯-এ 'this' এবং 'next' হ্যান্ডেল করার লেটেস্ট নিয়ম
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 

  // পাসওয়ার্ড মডিফাই না হলে পরের ধাপে যাও
  if (!user.isModified('password')) {
    return next();
  }

  // পাসওয়ার্ড হ্যাশ করা
  user.password = await bcrypt.hash(
    user.password as string, 
    Number(config.bcrypt_salt_rounds)
  );
  
  next();
});

// Post-save: মঙ্গুস ৯-এ post হুক সাধারণত synchronous হয় এবং next লাগে না
userSchema.post("save", function (doc) {
  console.log(`[Database]: User ${doc.email} has been saved.`);
  

  if (doc) {
    doc.password = '';
  }
});

export const User = model<TUser>("User", userSchema);