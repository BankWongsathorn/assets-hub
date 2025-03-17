import prisma from "@/database";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";
import { AuditLogStatus, AuditLogType } from "@prisma/client";

interface ConditionType {
  type?: {
    in: AuditLogType[];
  };
  status?: {
    in: AuditLogStatus[];
  };
  created_at?: {
    gte?: Date;
    lte?: Date;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let condition: ConditionType = {};

    if (body.type.length > 0) {
      condition.type = {
        in: body.type,
      };
    }

    if (body.status.length > 0) {
      condition.status = {
        in: body.status,
      };
    }

    if (body.start_date) {
      condition.created_at = {
        gte: new Date(body.start_date),
      };
    }

    if (body.end_date) {
      condition.created_at = {
        lte: new Date(body.end_date),
      };
    }

    const result = await prisma.auditLog.findMany({
      where: condition,
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

    if (!result) throw new Error("Audit logs not found");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
