"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt = require("jsonwebtoken");
let UserIdMiddleware = class UserIdMiddleware {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async use(req, res, next) {
        var _a;
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (token) {
                const token = authorizationHeader.split(' ')[1];
                try {
                    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                    const userId = decodedToken.UserInfo.id;
                    if (userId) {
                        const user = await this.userModel.findById(userId);
                        const { _id, email } = user;
                        req.currentUser = { _id, email };
                    }
                }
                catch (error) {
                    console.error('Błąd weryfikacji tokena:', error);
                }
            }
        }
        next();
    }
};
UserIdMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserIdMiddleware);
exports.UserIdMiddleware = UserIdMiddleware;
//# sourceMappingURL=userid-middleware.js.map