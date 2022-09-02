import { ContactDataSource } from "../../domain/data_source/ContactDatasource";
import { Contact } from "../../domain/models/ContacEntity";
import { DatabaseWrapper } from "./DatabaseWrapper";

export class MongoDBContactDataSource implements ContactDataSource{
    private database: DatabaseWrapper
    constructor(database: DatabaseWrapper){
        this.database = database
    }

    async create(contact: Contact): Promise<boolean> {
        const result = await this.database.insertOne(contact)
        return result !== null
    }

    async getAll(): Promise<Contact[]> {
        const result = await this.database.find({})
        return result.map(item => ({
            id: item._id.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email
        }))
    }
}