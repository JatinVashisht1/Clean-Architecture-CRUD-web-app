import { Contact } from "../models/ContacEntity";
import { ContactRepository } from "../repository/ContactRepository";
import { CreateContactUseCase } from "./interface/CreateContactUseCase";

export class CreateContact implements CreateContactUseCase{
    contactRepository: ContactRepository
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository
    }

    async execute(contact: Contact): Promise<boolean> {
        const result = await this.contactRepository.createContact(contact)
        return result
    }
}