import prisma from "@/database";
import { UserSession } from "@/utils/auth/UserSession";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await prisma.auditLog.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        asset: true,
        user: true,
        reported_by: true,
        handled_by: true,
      },
    });

    if (!result) throw new Error("Audit not found");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const user = await UserSession();
    if (!user) throw new Error("Unauthorized");

    const result = await prisma.auditLog.update({
      where: {
        id: (await params).id,
      },
      data: {
        status: body.status,
        handled_by_id: user.id,
      },
    });

    if (!result) throw new Error("Failed to update audit log");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
