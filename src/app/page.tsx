import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function Home() {
  async function name() {
    const user = await prisma.name.create({
      data: {
        username: "anshika",
        email: "anshika@gmail.com",
        password: "123456",
        firstName: "raghav",
        lastName: "nagpal"
      }

    })
    console.log(user)
  }

  return (
    <><h1 className="underline text-4xl">devfolio clone</h1></>);
}
