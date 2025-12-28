import { Request, Response } from "express";
import { userServer } from "./user.serves";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServer.getUser();
    res.status(200).json({
      success: true,
      message: "Successfully All User Gotten",
      result: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const updateUser = async (req:Request,res:Response)=>{
  try{
    const result = await userServer.updateUser(req.body)
    res.status(200).json({
      success: true,
      message:"Successfully Updated",
      details: result.rows
    })
  }catch(err:any){
     res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const deleteUser = async (req:Request,res:Response)=>{
  const id = Number(req.params.id)
  try{
    const result = await userServer.deleteUser(id)
    res.status(200).json({
      success: true,
      message: "User Deleted",
      detatils: result.rows,
    })
  }catch(err:any){
     res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const userControler = {
  getUser,
  updateUser,
  deleteUser
};
