import { Request, Response } from "express";
import { userServer } from "./user.serves";
import { JwtPayload } from "jsonwebtoken";

const getUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { role } = req.user as JwtPayload;
    if (role === "admin") {
      const result = await userServer.getUser();
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    }
    return res.status(403).json({
      success: false,
      message: "only admin can get all user",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user_id = Number(req.params.id);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { id, role } = req.user as JwtPayload;

  try {
    if (role === "customer" && id !== user_id) {
      console.log("asce");
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const result = await userServer.updateUser(req.body, user_id, role);

    return res.status(200).json({
      success: true,
      message: "Successfully Updated",
      details: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { role } = req.user as JwtPayload;
    if (role === "admin") {
      await userServer.deleteUser(id);
      return res.status(200).json({
        success: true,
        message: "User Deleted",
      });
    }
    return res.status(403).json({
      success: false,
      message: "only admin can delete",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControler = {
  getUser,
  updateUser,
  deleteUser,
};
