import { Router } from "express";
import teacherModel from "../../models/teacherModel.js";

import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg("Name", RESPONSE.REQUIRED));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg("Email", RESPONSE.REQUIRED));
    }

    if (!password || password == undefined) {
      return send(res, setErrMsg("Password", RESPONSE.REQUIRED));
    }

    let isEmailVaild = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (isEmailVaild == null) {
      return send(res, setErrMsg("Email", RESPONSE.INVALID));
    }

    let isEmailExists = await teacherModel.findOne({ email: email });

    if (isEmailExists) {
      return send(res, setErrMsg("Email", RESPONSE.ALREADY_EXISTS));
    }

    await teacherModel.create({
      name,
      email,
      password,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create Student", error);
    return res.send(res, RESPONSE.UNKNOWN_ERR);
  }
});
