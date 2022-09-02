import { MongoClient } from "mongodb"
import app from "./index"
import { ContactRepositoryImpl } from "./src/data/ContactRepositoryImpl"
import { DatabaseWrapper } from "./src/data/database/DatabaseWrapper"
import { MongoDBContactDataSource } from "./src/data/database/MongoDBContactDataSource"
import { CreateContact } from "./src/domain/use_cases/CreateContact"
import { GetAllContacts } from "./src/domain/use_cases/GetAllContacts"
import ContactsRouter from "./src/presentation/routes/ContactsRouter"
(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/contacts")
    await client.connect()
    const db = client.db("CONTACTS_DB")

    const contactDatabase: DatabaseWrapper = {
        find(query) 
        { 
            return db.collection("contacts").find(query).toArray()
        },
        insertOne(doc) {
            return db.collection("contacts").insertOne(doc)
        },
    }

    const contactMiddleWare = ContactsRouter(
        new GetAllContacts(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))),
        new CreateContact(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase)))
    )

    app.use('/contact', contactMiddleWare)
    app.listen(3000, () => {
        console.log(`server up on http://localhost:3000`)
    })
})()