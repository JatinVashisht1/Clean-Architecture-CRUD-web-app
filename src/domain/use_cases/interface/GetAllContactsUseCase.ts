import { Contact } from "../../models/ContacEntity";

export interface GetAllContactsUseCase{
    execute(): Promise<Contact[]>
}