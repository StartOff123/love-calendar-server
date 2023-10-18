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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const passworHash = await bcrypt.hash(createUserDto.password, 10);
        return await this.prismaService.user.create({
            data: {
                login: createUserDto.login,
                password: passworHash,
                name: createUserDto.name,
                days: '[{"title":"Сентябрь","month":8,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false}]},{"title":"Октябрь","month":9,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false},{"day":31,"active":false}]},{"title":"Ноябрь","month":10,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false}]},{"title":"Декабрь","month":11,"days":[{"day":1,"active":false},{"day":2,"active":false},{"day":3,"active":false},{"day":4,"active":false},{"day":5,"active":false},{"day":6,"active":false},{"day":7,"active":false},{"day":8,"active":false},{"day":9,"active":false},{"day":10,"active":false},{"day":11,"active":false},{"day":12,"active":false},{"day":13,"active":false},{"day":14,"active":false},{"day":15,"active":false},{"day":16,"active":false},{"day":17,"active":false},{"day":18,"active":false},{"day":19,"active":false},{"day":20,"active":false},{"day":21,"active":false},{"day":22,"active":false},{"day":23,"active":false},{"day":24,"active":false},{"day":25,"active":false},{"day":26,"active":false},{"day":27,"active":false},{"day":28,"active":false},{"day":29,"active":false},{"day":30,"active":false},{"day":31,"active":false}]}]'
            }
        });
    }
    async login(signInDto) {
        const user = await this.prismaService.user.findUnique({ where: { login: signInDto.login } });
        if (!user)
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        const passwordValid = await bcrypt.compare(signInDto.password, user.password);
        if (!passwordValid)
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        const payload = { id: user.id };
        if (user && passwordValid) {
            return {
                id: user.id,
                name: user.name,
                login: user.login,
                AvatarUrl: user.AvatarUrl,
                days: user.days,
                access_token: await this.jwtService.signAsync(payload)
            };
        }
    }
    async loginCheck(id) {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        return {
            id: user.id,
            name: user.name,
            login: user.login,
            AvatarUrl: user.AvatarUrl,
            days: user.days,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map