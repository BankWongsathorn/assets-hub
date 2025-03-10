import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await prisma.asset.findMany({
      where: {
        user_id: (await params).id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
