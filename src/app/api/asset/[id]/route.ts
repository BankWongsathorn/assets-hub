import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await prisma.asset.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        user: true,
      },
    });

    if (!result) throw new Error("Asset not found");

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

    const result = await prisma.asset.update({
      where: {
        id: (await params).id,
      },
      data: {
        name: body.name,
        warranty_expiry: body.warranty_expiry,
        status: body.status,
      },
    });

    if (!result) throw new Error("Failed to update asset");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
