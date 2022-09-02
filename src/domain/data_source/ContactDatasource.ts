import { Contact } from "../models/ContacEntity";

export interface ContactDataSource{
    create(contact: Contact): Promise<boolean>;
    getAll(): Promise<Contact[]>
}