"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.get('/', userController_1.userController.getUsers);
userRouter.post('/', userController_1.userController.createUser);
userRouter.delete('/:id', userController_1.userController.deleteUser);
userRouter.put('/:id/disable', userController_1.userController.disableUser);
userRouter.put('/:id/enable', userController_1.userController.enableUser);
userRouter.get('/:id', userController_1.userController.getOneUser);
userRouter.put('/:id', userController_1.userController.updateUser);
userRouter.get('/roles/:id', userController_1.userController.getUserRoles);
userRouter.post('/:id/reset-password', userController_1.userController.resetUserPassword);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map