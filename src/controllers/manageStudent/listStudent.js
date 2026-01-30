import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constant.js";

const router = Router();

export default router.get("/", async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    let skip = (page - 1) * limit;

    let students = await studentModel
      .find(
        {
          isactive: STATE.ACTIVE, //student state is active or not chane to INACTIVE to see deleted students
          name: {
            $regex: req.query.searchkey ?? "",
            $options: "i",
          },
        },
        { __v: 0 }, // 0 means to not to display it
      )
      .skip(skip)
      .limit(limit);

    if (students.length == 0) {
      //because the student comes in an array we have to use the length method
      return send(res, setErrMsg("students", RESPONSE.NOT_FOUND)); //error message if student is not found
    }

    return send(res, RESPONSE.SUCCESS, students);
  } catch (error) {
    console.log("list Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
