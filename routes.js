import createStudent from "./src/controllers/manageStudent/createStudent.js";
import deleteStudent from "./src/controllers/manageStudent/deleteStudent.js";
import editStudent from "./src/controllers/manageStudent/editStudent.js";
import listStudent from "./src/controllers/manageStudent/listStudent.js";
import register from "./src/controllers/auth/register.js";
import login from "./src/controllers/auth/login.js";

const router = (app) => {
  app.use("/api/create-student", createStudent);
  app.use("/api/list-student", listStudent);
  app.use("/api/edit-student", editStudent);
  app.use("/api/delete-student", deleteStudent);

  //auth
  app.use("/api/register", register);
  app.use("/api/login", login);
};
export default router;
