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
      return res.send({
        code: 202,
        message: "rollno already exists",
      });
    }

    let isEmailExists = await studentModel.findOne({ email: email });

    if (isEmailExists) {
      return res.send({
        code: 202,
        message: "email already exists",
      });
    }

    await studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });

    return res.send({
      code: 200,
      message: "student created succesfully",
    });
  } catch (error) {
    console.log("Create Student", error);
    return res.send({
      code: 500,
      message: "Somethig went wrong",
    });
  }
});
