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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getMe(id) {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        const { password, ...data } = user;
        return {
            ...data
        };
    }
    async online(id) {
        await this.prismaService.user.update({
            where: { id },
            data: {
                online: true
            }
        });
    }
    async offline(id) {
        await this.prismaService.user.update({
            where: { id },
            data: {
                online: false
            }
        });
    }
    async updateDays(id, dto) {
        return await this.prismaService.user.update({
            where: { id },
            data: {
                days: dto.days
            }
        });
    }
    async getUser(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id: Number(id) }
        });
        return {
            id: user.id,
            name: user.name,
            online: user.online
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map