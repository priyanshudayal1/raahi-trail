import { notFound, redirect } from "next/navigation";
import AdminTripForm from "../../../AdminTripForm";
import { getAdminSession } from "../../../../../lib/adminSession";
import { getTripBySlugFromDb } from "../../../../../lib/tripsDb";

export const metadata = {
  title: "Edit Trip | Raahi Trail Admin",
};

export default async function EditTripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const trip = await getTripBySlugFromDb(slug);

  if (!trip) {
    notFound();
  }

  return <AdminTripForm initialTrip={trip} previousSlug={trip.slug} />;
}
