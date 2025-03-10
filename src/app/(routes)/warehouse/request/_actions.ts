import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogStatus } from "@prisma/client";

export async function handleCancel(id: string) {
  try {
    const res = await fetchData({
      method: "PUT",
      path: `/audit/${id}`,
      body: {
        status: AuditLogStatus.Cancelled,
      },
    });

    if (res.status === "error") throw new Error("Failed to cancel request");

    await fetchData({
      method: "PUT",
      path: `/asset/${res.data.asset_id}`,
      body: {
        status: AssetStatus.Available,
      },
    });

    toast({
      title: "Success",
      description: "Request has been cancelled",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    return toast({
      title: "Failed",
      description: String(error),
    });
  }
}
