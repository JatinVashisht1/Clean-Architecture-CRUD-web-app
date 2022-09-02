import { GetAllContactsUseCase } from "./interface/GetAllContactsUseCase";
import { Contact } from "../models/ContacEntity";
import {ContactRepository} from '../repository/ContactRepository'

export class GetAllContacts implements GetAllContactsUseCase{
    contactRepository: ContactRepository
    
    constructor(contactRepository: ContactRepository){
        this.contactRepository = contactRepository
    }
    
    async execute(): Promise<Contact[]> {
        const result = await this.contactRepository.getContacts()
        return result
    }
}