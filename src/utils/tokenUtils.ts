import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string) => {
  const data = { id, email };

  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
