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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
const create_dto_file_1 = require("./dto/create-dto-file");
let UrlController = class UrlController {
    urlService;
    constructor(urlService) {
        this.urlService = urlService;
    }
    async create(dto) {
        return this.urlService.createShortUrl(dto.originalUrl);
    }
    async redirect(shortCode) {
        const url = await this.urlService.redirect(shortCode);
        return { url };
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_file_1.classValidator]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':shortCode'),
    __param(0, (0, common_1.Param)('shortCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "redirect", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)("shorten"),
    __metadata("design:paramtypes", [url_service_1.UrlServices])
], UrlController);
//# sourceMappingURL=url.controller.js.map