"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const index_1 = require("express-session/index");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, index_1.default)({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.enableCors({
        credentials: true,
        origin: ['*']
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map