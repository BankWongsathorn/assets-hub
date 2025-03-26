import prisma from "@/database";
import { SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);

  const result = await prisma.asset.findMany({
    where: {
      created_at: {
        gte: startOfYear,
        lt: startOfNextYear,
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return SendHandler(result);
}
