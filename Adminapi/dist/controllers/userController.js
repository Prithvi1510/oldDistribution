"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
//Role Imports 
const userService_2 = require("../services/userService");
exports.userController = {
    async getUsers(req, res) {
        try {
            const users = await (0, userService_1.getAllUsers)();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getOneUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await (0, userService_1.getOneUser)(userId);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createUser(req, res) {
        try {
            const userData = req.body;
            const result = await (0, userService_1.createUser)(userData);
            res.status(result.status).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await (0, userService_1.deleteUser)(userId);
            res.status(result.code).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async disableUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await (0, userService_1.disableUser)(userId);
            res.status(result.code).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async enableUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await (0, userService_1.enableUser)(userId);
            res.status(result.code).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const result = await (0, userService_1.updateUser)(userId, userData);
            res.status(result.code).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async resetUserPassword(req, res) {
        try {
            const userId = req.params.id;
            const { password, temporary } = req.body;
            const result = await (0, userService_1.resetUserPassword)(userId, password, false);
            res.status(result.code).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    ///////////////ROLES PART/////////////////
    async getUserRoles(req, res) {
        try {
            const userId = req.params.id;
            const roles = await (0, userService_2.getUserRoles)(userId);
            res.status(200).json({ code: 200, message: `Roles for user ${userId}`, data: roles });
        }
        catch (error) {
            res.status(500).json({ code: 500, message: error.message });
        }
    },
    async getAllUsersRoles(req, res) {
        try {
            // Expecting an array of user IDs in the request body
            const { userIds } = req.body;
            if (!Array.isArray(userIds)) {
                return res.status(400).json({ code: 400, message: "userIds must be an array" });
            }
            const roles = await (0, userService_2.getAllUsersRoles)(userIds);
            res.status(200).json({ code: 200, message: "Roles for users", data: roles });
        }
        catch (error) {
            res.status(500).json({ code: 500, message: error.message });
        }
    }
};
//# sourceMappingURL=userController.js.map