import createStudent from "./src/controllers/manageStudent/createStudent.js";
import deleteStudent from "./src/controllers/manageStudent/deleteStudent.js";
import editStudent from "./src/controllers/manageStudent/editStudent.js";
import listStudent from "./src/controllers/manageStudent/listStudent.js";

const router = (app) => {
  app.use("/api/create-student", createStudent);
  app.use("/api/list-student", listStudent);
  app.use("/api/edit-student", editStudent);
  app.use("/api/delete-student", deleteStudent);
};
export default router;
