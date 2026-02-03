import { Router } from "express";
import teacherModel from "../../models/teacherModel.js";

import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import bcrypt from "bcrypt";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { name, password, email } = req.body || {};

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

    // password validation

    let isPasswordValid = String(password).match(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
    );

    if (isPasswordValid == null) {
      return send(res, setErrMsg("Password", RESPONSE.INVALID));
    }

    let isEmailExists = await teacherModel.findOne({ email: email });

    if (isEmailExists) {
      return send(res, setErrMsg("Email", RESPONSE.ALREADY_EXISTS));
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    console.log("Encrypted Password:");

    await teacherModel.create({
      name,
      email,
      password: encryptedPassword,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create Teacher", error);
    return res.send(res, RESPONSE.UNKNOWN_ERR);
  }
});
