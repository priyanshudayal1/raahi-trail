import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/adminSession";
import { getTripDestinationsFromDb, queryTripsFromDb } from "../../lib/tripsDb";
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

  const [initialResult, destinations] = await Promise.all([
    queryTripsFromDb({ page: 1, pageSize: 6 }),
    getTripDestinationsFromDb(),
  ]);

  return (
    <AdminTripsDashboard
      destinations={destinations}
      initialResult={initialResult}
      username={session.username}
    />
  );
}
