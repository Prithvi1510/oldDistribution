"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const roleRouter = (0, express_1.Router)();
// Example: GET /roles/client/my-client
roleRouter.get("/client/:clientId", roleController_1.roleController.getAllClientRoles);
exports.default = roleRouter;
//# sourceMappingURL=roleRoutes.js.map