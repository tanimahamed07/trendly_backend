
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        email: string;
        role: "user" | "admin";
      };
    }
  }
}
export {};