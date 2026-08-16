"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClientRoles = getAllClientRoles;
const axios_1 = __importDefault(require("axios"));
const userService_1 = require("./userService");
const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL;
const REALM = process.env.REALM;
const CLIENT_NAME = process.env.CLIENT_NAME;
/**
 * Get all composite roles for a given clientId
 */
async function getAllClientRoles(clientId) {
    const token = await (0, userService_1.getAccessToken)();
    if (!token) {
        throw new Error("Failed to get access token from Keycloak");
    }
    // -------------------------------
    // Step 1: Get client UUID
    // -------------------------------
    const clientRes = await axios_1.default.get(`${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/clients`, {
        params: { clientId },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!Array.isArray(clientRes.data) || clientRes.data.length === 0) {
        throw new Error(`Client not found for clientId: ${clientId}`);
    }
    const clientUUID = clientRes.data[0].id;
    // -------------------------------
    // Step 2: Fetch all roles
    // -------------------------------
    const rolesRes = await axios_1.default.get(`${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/clients/${clientUUID}/roles`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    // -------------------------------
    // Step 3: Filter composite roles
    // -------------------------------
    const compositeRoles = rolesRes.data.filter((role) => role.composite === true);
    return compositeRoles;
}
//# sourceMappingURL=roleService.js.map