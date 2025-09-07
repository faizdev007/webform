import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AnniversaryForm from "./webform/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);

  if (!session) {
    redirect("/auth/signin");
  }

  return <AnniversaryForm />;
}
