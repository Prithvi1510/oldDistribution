"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleController = void 0;
const roleService_1 = require("../services/roleService");
exports.roleController = {
    // GET /roles/client/:clientId
    async getAllClientRoles(req, res) {
        try {
            const { clientId } = req.params;
            if (!clientId) {
                return res.status(400).json({
                    success: false,
                    message: "clientId is required",
                });
            }
            const roles = await (0, roleService_1.getAllClientRoles)(clientId);
            return res.status(200).json({
                success: true,
                message: "Client roles fetched successfully",
                total: roles.length,
                data: roles,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error?.message || "Failed to fetch client roles",
            });
        }
    },
};
//# sourceMappingURL=roleController.js.map