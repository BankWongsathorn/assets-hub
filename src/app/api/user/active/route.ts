import prisma from "@/database";
import { SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const result = await prisma.user.findMany({
    where: {
      status: "Active",
    },
    include: {
      department: true,
      role: true,
    },
    omit: {
      password: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log(result);

  return SendHandler(result);
}
