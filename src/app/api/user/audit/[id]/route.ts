import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await prisma.auditLog.findMany({
      where: {
        user_id: (await params).id,
      },
      include: {
        asset: true,
        user: true,
        reported_by: true,
        handled_by: true,
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
