export const siteConfig = {
  name: "Raahi Trail",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://raahitrail.com",
  title: "Raahi Trail | Curated Group Trips & Treks Across India",
  description:
    "Book curated group trips and treks across India with Raahi Trail. Explore Spiti, Ladakh, Kashmir, Meghalaya, Goa, Andaman, Uttarakhand, Himachal and more.",
  phone: "+91 99999 99999",
  email: "hello@raahitrail.com",
  instagram: "https://instagram.com/raahitrail",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
