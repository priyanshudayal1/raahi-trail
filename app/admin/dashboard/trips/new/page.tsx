import { redirect } from "next/navigation";
import AdminTripForm from "../../AdminTripForm";
import { getAdminSession } from "../../../../lib/adminSession";

export const metadata = {
  title: "Add Trip | Raahi Trail Admin",
};

export default async function NewTripPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminTripForm />;
}
