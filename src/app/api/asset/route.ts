import prisma from "@/database";
import { AssetStatus } from "@prisma/client";
import { generateUUIDv4 } from "@/utils/GenerateUUID";
import { ErrorHandler, SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const asset = await prisma.asset.findMany({
    include: {
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return SendHandler(asset);
}

export async function POST(req: Request) {
  const temp = [];
  let lotRecord = 1;

  try {
    const data = await req.json();

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const asset = await prisma.asset.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    });

    if (asset.length > 0) {
      lotRecord = parseInt(asset[0].lot_number.slice(-3)) + 1;
    }

    const y = currentYear.toString().slice(2, 4);
    const m = `${currentMonth}`.padStart(2, "0");
    const c = `${lotRecord}`.padStart(3, "0");

    for (let i = 0; i < data.amount; i++) {
      temp.push({
        lot_number: `LOT${y}${m}${c}`,
        serial_number: generateUUIDv4(),
        name: data.name,
        purchase_date: data.purchasedate,
        warranty_expiry: data.warrantyexpiry || "",
        status: AssetStatus.Available,
      });
    }

    const result = await prisma.asset.createMany({
      data: temp,
    });

    if (!result) throw new Error("Failed to create asset");

    return SendHandler(result);
  } catch (error) {
    return ErrorHandler(error);
  }
}
