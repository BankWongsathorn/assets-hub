import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";

export const handleSubmit = async (data: any, status: any) => {
  if (!status) return;

  try {
    const res = await fetchData({
      method: "POST",
      path: "/audit",
      body: {
        asset_id: data.id,
        user_id: data.user_id,
        type: status,
      },
    });

    if (res.status === "error") throw new Error(res.message);

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
};
