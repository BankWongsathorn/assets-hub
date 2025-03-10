import { UserStatus } from "@prisma/client";
import { AssetStatus } from "@prisma/client";
import { AuditLogStatus } from "@prisma/client";

export default function TextColor({ status }: { status: any }) {
  let color = "";

  if (
    [
      AuditLogStatus.Pending,
      AssetStatus.Maintenance,
      AssetStatus.Waiting,
    ].includes(status)
  ) {
    color = "bg-yellow-100 text-yellow-700";
  } else if (
    [
      UserStatus.Active,
      AssetStatus.Available,
      AuditLogStatus.Approved,
      AuditLogStatus.Completed,
    ].includes(status)
  ) {
    color = "bg-green-100 text-green-700";
  } else if (
    [AssetStatus.Assigned, AuditLogStatus.InProgress].includes(status)
  ) {
    color = "bg-blue-100 text-blue-700";
  } else if (
    [
      UserStatus.Inactive,
      AssetStatus.Disposed,
      AssetStatus.Lost,
      AuditLogStatus.Rejected,
      AuditLogStatus.Cancelled,
    ].includes(status)
  ) {
    color = "bg-red-100 text-red-700";
  } else {
    color = "bg-gray-100 text-gray-700";
  }

  return (
    <div className={`px-2 py-1 rounded-full w-fit ${color}`}>{status}</div>
  );
}
