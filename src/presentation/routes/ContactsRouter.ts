import express, { Request, Response } from 'express'
import { CreateContactUseCase } from "../../domain/use_cases/interface/CreateContactUseCase";
import { GetAllContactsUseCase } from "../../domain/use_cases/interface/GetAllContactsUseCase";

export default function ContactsRouter(
    getAllContactsUseCase: GetAllContactsUseCase,
    createContactUseCase: CreateContactUseCase
){
    const router = express.Router()

    router.get('/',async (req:Request, res: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute()
            return res.status(200).send(contacts)
        } catch (error) {
            return res.status(500).json({message: "Error fetching data"})
        }
    })

    router.post('/',async (req: Request, res: Response) => {
        try {
            await createContactUseCase.execute(req.body)
            return res.status(200).json({message: "contact created"})
        } catch (error) {
            return res.status(200).json({message: "contact created"})
        }
    })

    return router;
}