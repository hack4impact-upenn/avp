"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = __importDefault(require("./admin.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const referral_route_1 = __importDefault(require("./referral.route"));
const prefixToRouterMap = [
    {
        prefix: '/api/auth',
        router: auth_route_1.default,
    },
    {
        prefix: '/api/admin',
        router: admin_route_1.default,
    },
    {
        prefix: '/api/referral',
        router: referral_route_1.default,
    },
];
exports.default = prefixToRouterMap;
//# sourceMappingURL=routers.js.map