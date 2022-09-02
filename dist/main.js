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
const mongodb_1 = require("mongodb");
const index_1 = __importDefault(require("./index"));
const ContactRepositoryImpl_1 = require("./src/data/ContactRepositoryImpl");
const MongoDBContactDataSource_1 = require("./src/data/database/MongoDBContactDataSource");
const CreateContact_1 = require("./src/domain/use_cases/CreateContact");
const GetAllContacts_1 = require("./src/domain/use_cases/GetAllContacts");
const ContactsRouter_1 = __importDefault(require("./src/presentation/routes/ContactsRouter"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient("mongodb://localhost:27017/contacts");
    yield client.connect();
    const db = client.db("CONTACTS_DB");
    const contactDatabase = {
        find(query) {
            return db.collection("contacts").find(query).toArray();
        },
        insertOne(doc) {
            return db.collection("contacts").insertOne(doc);
        },
    };
    const contactMiddleWare = (0, ContactsRouter_1.default)(new GetAllContacts_1.GetAllContacts(new ContactRepositoryImpl_1.ContactRepositoryImpl(new MongoDBContactDataSource_1.MongoDBContactDataSource(contactDatabase))), new CreateContact_1.CreateContact(new ContactRepositoryImpl_1.ContactRepositoryImpl(new MongoDBContactDataSource_1.MongoDBContactDataSource(contactDatabase))));
    index_1.default.use('/contact', contactMiddleWare);
    index_1.default.listen(3000, () => {
        console.log(`server up on http://localhost:3000`);
    });
}))();
