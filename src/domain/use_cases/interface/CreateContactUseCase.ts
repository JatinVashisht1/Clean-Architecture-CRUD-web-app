import { Contact } from "../../models/ContacEntity";

export interface CreateContactUseCase{
    execute(contact: Contact): Promise<boolean>
}