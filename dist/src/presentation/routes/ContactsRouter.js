"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function ContactsRouter(getAllContactsUseCase, createContactUseCase) {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield getAllContactsUseCase.execute();
            return res.status(200).send(contacts);
        }
        catch (error) {
            return res.status(500).json({ message: "Error fetching data" });
        }
    }));
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield createContactUseCase.execute(req.body);
            return res.status(200).json({ message: "contact created" });
        }
        catch (error) {
            return res.status(200).json({ message: "contact created" });
        }
    }));
    return router;
}
exports.default = ContactsRouter;
