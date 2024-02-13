import { RequestHandler, Router } from "express";
import userController from "../controllers/user.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";

const userRouter = Router()

userRouter.post("/create", userController.createUser)
userRouter.put("/update", [checkLoggedIn as RequestHandler], userController.updateUser as any)
userRouter.get("/me", [checkLoggedIn as RequestHandler], userController.me as any)
userRouter.get("/all", [checkAdmin as any], userController.all)
userRouter.get("/:id", [], userController.getById)
userRouter.get("/search/:query", [], userController.searchUser)
userRouter.delete("/", [checkLoggedIn as RequestHandler], userController.deleteUser as any)
userRouter.delete("/remove-avatar", [checkLoggedIn as RequestHandler], userController.removeAvatar as any)
userRouter.delete("/by-id/:id", [checkAdmin as any], userController.getById)
userRouter.patch("/update-avatar", [checkLoggedIn as RequestHandler], userController.updateAvatar as any)

export default userRouter