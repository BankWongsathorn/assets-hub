import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogStatus, AuditLogType } from "@prisma/client";

export async function onSubmit(data: any, status: string) {
  if (!status) return;
  let update_asset = {};

  try {
    if (status === AuditLogStatus.Approved) {
      if (data.type === AuditLogType.Assignment) {
        update_asset = {
          status: AssetStatus.Assigned,
          user_id: data.user_id,
        };
      } else if (data.type === AuditLogType.Return) {
        update_asset = {
          status: AssetStatus.Available,
          user_id: null,
        };
      }
    }

    if (status === AuditLogStatus.InProgress) {
      update_asset = {
        status: AssetStatus.Maintenance,
      };
    }

    if (status === AuditLogStatus.Completed) {
      update_asset = {
        status: AssetStatus.Assigned,
      };
    }

    if (status === AuditLogStatus.Cancelled) {
      update_asset = {
        status: AssetStatus.Disposed,
      };
    }

    if (status === AuditLogStatus.Rejected) {
      if (data.type === AuditLogType.Assignment) {
        update_asset = {
          status: AssetStatus.Available,
        };
      } else if (
        data.type === AuditLogType.Return ||
        data.type === AuditLogType.Maintenance
      ) {
        update_asset = {
          status: AssetStatus.Assigned,
        };
      }
    }

    const res = await fetchData({
      method: "PUT",
      path: `/asset/status/${data.asset_id}`,
      body: update_asset,
    });

    if (res.status === "error") throw new Error(res.message);

    const audit = await fetchData({
      method: "PUT",
      path: `/audit/${data.id}`,
      body: {
        status,
      },
    });

    if (audit.status === "error") throw new Error(audit.message);

    toast({
      title: "Success",
      description: "Data has been saved",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    return toast({
      title: "Failed",
      description: `${error}`,
    });
  }
}
