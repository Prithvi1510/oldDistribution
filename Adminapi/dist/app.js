"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleController = void 0;
exports.getAccessToken = getAccessToken;
exports.getAllUsers = getAllUsers;
const express_1 = __importStar(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: '*',
    allowedHeaders: '*'
}));
app.use((0, express_1.json)());
// Keycloak config
const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL;
const REALM = process.env.REALM;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// ----------------- Services -----------------
async function getAccessToken() {
    const tokenUrl = `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');
    const response = await axios_1.default.post(tokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data.access_token;
}
async function getAllUsers() {
    const token = await getAccessToken();
    const response = await axios_1.default.get(`${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}
// ----------------- Example Controller for Legacy Checking  -----------------
exports.exampleController = {
    async listUsers(req, res) {
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            console.error(error.response?.data || error.message);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    },
    // Add more controllers here for createUser, deleteUser, disableUser
};
// Health Check 
async function healthCheck(req, res) {
    res.status(200).json({ message: "The Server is Running" });
}
// ----------------- Routes -----------------
app.get('/healthcheck', (req, res) => healthCheck(req, res));
app.get('/example/listall', (req, res) => exports.exampleController.listUsers(req, res));
app.use('/users', userRoutes_1.default);
app.use('/roles', roleRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map