import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { getDefaultAutoSelectFamily } from "net";

export const createUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const passwordCHeck = password === existingUser!.password;

    if (!existingUser)
      return res
        .status(404)
        .json({ isError: true, message: "User not found." });
    if (!passwordCHeck)
      return res
        .status(400)
        .json({ isError: true, message: "Invalid details" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "auth",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ isError: false, result: existingUser, token });
  } catch (error) {
    res.status(500).json({ isError: true, message: "Something went wrong" });
  }
};
