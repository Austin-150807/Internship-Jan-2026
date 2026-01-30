import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { name, rollno, email } = req.body || {};
    console.log("name = ", name);
    console.log("rollno = ", rollno);
    console.log("email = ", email);

    if (!name || name == undefined) {
      return send(res, setErrMsg("Name", RESPONSE.REQUIRED));
    }

    if (!rollno || rollno == undefined) {
      return send(res, setErrMsg("Rollno", RESPONSE.REQUIRED));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg("Name", RESPONSE.REQUIRED));
    }

    let isEmailVaild = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (isEmailVaild == null) {
      return send(res, setErrMsg("Email", RESPONSE.INVALID));
    }

    let isRollnoExists = await studentModel.findOne({ rollno: rollno });

    if (isRollnoExists) {
      return send(res, setErrMsg("Rollno", RESPONSE.ALREADY_EXISTS));
    }

    let isEmailExists = await studentModel.findOne({ email: email });

    if (isEmailExists) {
      return send(res, setErrMsg("Email", RESPONSE.ALREADY_EXISTS));
    }

    await studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create Student", error);
    return res.send(res, RESPONSE.UNKNOWN_ERR);
  }
});
