import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()
async function main() {
    try {
        const admin = await client.role.create({
            data: {
                name: "admin"
            },
        })
        const user = await client.role.create({
            data: {
                name: "user"
            },
        })
        console.log(admin, user)
    } catch (error) {
        console.error(error);
    }
}
main()
