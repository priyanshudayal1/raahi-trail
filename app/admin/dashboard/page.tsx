import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/adminSession";
import { getTripsFromDb } from "../../lib/tripsDb";
import AdminTripsDashboard from "./AdminTripsDashboard";

export const metadata = {
  title: "Trip Dashboard | Raahi Trail Admin",
  description: "Add, edit, and delete Raahi Trail trips.",
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const trips = await getTripsFromDb();

  return <AdminTripsDashboard initialTrips={trips} username={session.username} />;
}
