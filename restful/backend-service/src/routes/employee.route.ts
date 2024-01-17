import { Router } from "express";
import { createEmployee, deleteEmployee, getPaginated, updateEmployee } from "../controllers/employee.controller";
import { checkLoggedIn } from "../middlewares/auth.middleware";

const employeeRouter = Router();

employeeRouter.get("/paginated", [checkLoggedIn], getPaginated)
employeeRouter.post("/create", [checkLoggedIn], createEmployee)
employeeRouter.get("/delete/:id", [checkLoggedIn], deleteEmployee)
employeeRouter.put("/update/:id", [checkLoggedIn], updateEmployee)

export default employeeRouter;
