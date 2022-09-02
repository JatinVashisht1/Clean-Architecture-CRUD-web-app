import { ContactDataSource } from "../../domain/data_source/ContactDatasource";
import { Contact } from "../../domain/models/ContacEntity";
import { ContactRepository } from "../../domain/repository/ContactRepository";

export class ContactRepositoryImpl implements ContactRepository{
    contactDataSource: ContactDataSource
    constructor(contactDataSource: ContactDataSource){
        this.contactDataSource = contactDataSource
    }

    async createContact(contact: Contact): Promise<boolean>{
        const result = await this.contactDataSource.create(contact)
        return result;
    }

    async getContacts(): Promise<Contact[]> {
        const result = await this.contactDataSource.getAll()
        return result
    }
}