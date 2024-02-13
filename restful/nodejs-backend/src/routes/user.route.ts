import { RequestHandler, Router } from "express";
import userController from "../controllers/user.controller";
import { CreateUserDTO, UpdateAvatarDTO, UpdateUserDTO } from "../dtos/user.dto";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";

const userRouter = Router()

userRouter.post("/create", [validationMiddleware(CreateUserDTO)], userController.createUser)
userRouter.put("/update", [checkLoggedIn as RequestHandler, validationMiddleware(UpdateUserDTO)], userController.updateUser as any)
userRouter.get("/me", [checkLoggedIn as RequestHandler], userController.me as any)
userRouter.get("/all", [checkAdmin as any], userController.all)
userRouter.get("/:id", [], userController.getById)
userRouter.get("/search/:query", [], userController.searchUser)
userRouter.delete("me", [checkLoggedIn as RequestHandler], userController.deleteUser as any)
userRouter.delete("/remove-avatar", [checkLoggedIn as RequestHandler], userController.removeAvatar as any)
userRouter.delete("/by-id/:id", [checkAdmin as any], userController.deleteById)
userRouter.patch("/update-avatar", [checkLoggedIn as RequestHandler, validationMiddleware(UpdateAvatarDTO)], userController.updateAvatar as any)

export default userRouter