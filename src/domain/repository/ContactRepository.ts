import { Contact } from "../models/ContacEntity";

export interface ContactRepository{
    createContact(contact: Contact): Promise<boolean>;
    getContacts(): Promise<Contact[]>;
}