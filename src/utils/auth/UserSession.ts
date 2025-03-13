import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/database";
import { getServerSession } from "next-auth";

export const UserSession = async (dept?: string) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  if (dept && ![dept, "Admin"].includes(session.user?.dept))
    throw new Error("You are not allowed");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? undefined,
    },
    include: {
      department: true,
    },
  });

  if (!user) throw new Error("Failed to get user");

  return user;
};
