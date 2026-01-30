import createStudent from "./src/controllers/manageStudent/createStudent.js";
import listStudent from "./src/controllers/manageStudent/listStudent.js";

const router = (app) => {
  app.use("/api/create-student", createStudent);
  app.use("/api/list-student", listStudent);
};

export default router;
