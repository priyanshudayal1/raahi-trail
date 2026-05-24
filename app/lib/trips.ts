export type Trip = {
  id?: string;
  slug: string;
  title: string;
  region: string;
  destination: string;
  tagline: string;
  image: string;
  imagePublicId?: string;
  durationDays: number;
  durationNights: number;
  groupSize: string;
  date: string;
  price: number;
  originalPrice: number;
  difficulty: string;
  highlights: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  included: string[];
  excluded: string[];
  stay: string;
  meetingPoint: string;
  gallery: string[];
  galleryPublicIds?: string[];
};

const defaultIncluded = [
  "Curated stays for the full trip",
  "Local transfers during the journey",
  "Trip captain and ground support",
  "Permits and basic first-aid support",
  "Community experiences and guided walks",
];

const defaultExcluded = [
  "Flights or train tickets to the meeting point",
  "Personal shopping and snacks",
  "Travel insurance",
];

function makeItinerary(
  destination: string,
  durationDays: number,
): Trip["itinerary"] {
  const core = [
    {
      title: `Arrive at ${destination}`,
      description: "Meet the crew, settle in, and get the trip briefing.",
    },
    {
      title: "Local trails and hidden corners",
      description: "Explore the route with enough pauses for chai and photos.",
    },
    {
      title: "Big-view day",
      description: "The signature experience of the trip, planned around the best light.",
    },
    {
      title: "Slow morning, deeper stories",
      description: "A flexible day for cafes, villages, markets, or a short hike.",
    },
    {
      title: "Return with a crew",
      description: "Final breakfast, goodbye hugs, and way too many group photos.",
    },
  ];

  return Array.from({ length: durationDays }, (_, index) => ({
    day: index + 1,
    ...(core[index] ?? {
      title: `Day ${index + 1} on trail`,
      description: "A balanced day of movement, rest, views, and local experiences.",
    }),
  }));
}

function buildTrip(
  trip: Omit<Trip, "included" | "excluded" | "itinerary" | "gallery"> & {
    included?: string[];
    excluded?: string[];
    itinerary?: Trip["itinerary"];
    gallery?: string[];
  },
): Trip {
  return {
    ...trip,
    included: trip.included ?? defaultIncluded,
    excluded: trip.excluded ?? defaultExcluded,
    itinerary: trip.itinerary ?? makeItinerary(trip.destination, trip.durationDays),
    gallery: trip.gallery ?? [
      trip.image.replace("w=1600", "w=1200"),
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
      "https://images.pexels.com/photos/31580155/pexels-photo-31580155.jpeg?w=1200",
    ],
  };
}

export const trips: Trip[] = [
  buildTrip({
    slug: "kedarkantha-winter-trek",
    title: "Kedarkantha Winter Trek",
    region: "Uttarakhand",
    destination: "Sankri",
    tagline: "Snow, summit and the best sunrise of your life",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600",
    durationDays: 6,
    durationNights: 5,
    groupSize: "12-20",
    date: "15 Jan 2027",
    price: 8999,
    originalPrice: 10999,
    difficulty: "Easy-Moderate",
    highlights: [
      "12,500ft summit push",
      "Juda ka Talab frozen lake",
      "Pine and oak snowy forests",
      "360-degree Himalayan panorama",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dehradun to Sankri",
        description: "10hr scenic drive through Mori.",
      },
      {
        day: 2,
        title: "Sankri to Juda ka Talab",
        description: "4km trek. Welcome to snow.",
      },
      {
        day: 3,
        title: "Juda ka Talab to Base Camp",
        description: "Short trek. Rest for summit.",
      },
      {
        day: 4,
        title: "Summit Day",
        description: "Start 4 AM. Sunrise at 12,500ft. Descend to base.",
      },
      {
        day: 5,
        title: "Descend to Sankri",
        description: "Hot shower and team dinner.",
      },
      {
        day: 6,
        title: "Sankri to Dehradun",
        description: "Home with stories.",
      },
    ],
    included: [
      "5 nights stay (hotel and tents)",
      "All meals on trek",
      "Forest permits",
      "Trek leader and support staff",
      "Safety equipment",
    ],
    excluded: ["Dehradun travel", "Personal gear rental", "Insurance"],
    stay: "Guesthouse in Sankri and alpine tents on trek.",
    meetingPoint: "Dehradun Railway Station - 6:30 AM",
  }),
  buildTrip({
    slug: "spiti-valley-circuit",
    title: "Spiti Valley Circuit",
    region: "Himachal Pradesh",
    destination: "Spiti",
    tagline: "Middle-land of monks, moonscapes and maddening views",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600",
    durationDays: 8,
    durationNights: 7,
    groupSize: "8-14",
    date: "12 Jun 2026",
    price: 18999,
    originalPrice: 22999,
    difficulty: "Moderate",
    highlights: [
      "Key Monastery sunrise",
      "Chandratal lake camp night",
      "Kaza cafes and high roads",
      "Pin Valley village walk",
    ],
    stay: "Guesthouses, homestays, and one campsite night.",
    meetingPoint: "Delhi ISBT - 8:00 PM",
  }),
  buildTrip({
    slug: "ladakh-road-trip",
    title: "Ladakh Road Trip",
    region: "Ladakh",
    destination: "Leh",
    tagline: "High passes, higher dopamine",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600",
    durationDays: 9,
    durationNights: 8,
    groupSize: "8-12",
    date: "10 Jul 2026",
    price: 24999,
    originalPrice: 29999,
    difficulty: "Moderate",
    highlights: [
      "Khardung La and high passes",
      "Pangong blue-hour stop",
      "Nubra Valley dunes",
      "Leh market and monastery trail",
    ],
    stay: "Hotels in Leh, camps in Nubra and Pangong.",
    meetingPoint: "Leh Airport - 11:00 AM",
  }),
  buildTrip({
    slug: "kashmir-great-lakes",
    title: "Kashmir Great Lakes Trek",
    region: "Kashmir",
    destination: "Sonamarg",
    tagline: "Alpine lakes, meadows and a trail that refuses to be ordinary",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1600",
    durationDays: 7,
    durationNights: 6,
    groupSize: "8-14",
    date: "05 Jul 2026",
    price: 16499,
    originalPrice: 19499,
    difficulty: "Moderate-Difficult",
    highlights: [
      "Vishansar and Gadsar lake views",
      "Meadow campsites",
      "High-altitude pass crossings",
      "Classic Kashmir alpine trail",
    ],
    stay: "Alpine tents on trek.",
    meetingPoint: "Srinagar Tourist Reception Centre - 7:00 AM",
  }),
  buildTrip({
    slug: "meghalaya-monsoon-trail",
    title: "Meghalaya Monsoon Trail",
    region: "Meghalaya",
    destination: "Cherrapunji",
    tagline: "Living root bridges, rain songs and cloud-soft mornings",
    image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?w=1600",
    durationDays: 7,
    durationNights: 6,
    groupSize: "10-16",
    date: "22 Aug 2026",
    price: 21999,
    originalPrice: 25999,
    difficulty: "Easy-Moderate",
    highlights: [
      "Living root bridge trail",
      "Dawki river day",
      "Waterfall hopping",
      "Shillong cafe evening",
    ],
    stay: "Boutique guesthouses and homestays.",
    meetingPoint: "Guwahati Airport - 12:00 PM",
  }),
  buildTrip({
    slug: "meghalaya-living-roots",
    title: "Meghalaya Living Roots",
    region: "Meghalaya",
    destination: "Cherrapunji",
    tagline: "Root bridges, blue rivers and rain-washed village trails",
    image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?w=1600",
    durationDays: 6,
    durationNights: 5,
    groupSize: "10-16",
    date: "05 Oct 2026",
    price: 15999,
    originalPrice: 18999,
    difficulty: "Easy-Moderate",
    highlights: [
      "Double-decker root bridge",
      "Cleanest village trail",
      "Crystal river viewpoint",
      "Cloudy cafe nights",
    ],
    stay: "Homestays and boutique guesthouses.",
    meetingPoint: "Guwahati Airport - 12:00 PM",
  }),
  buildTrip({
    slug: "tirthan-valley-retreat",
    title: "Tirthan Valley Retreat",
    region: "Himachal Pradesh",
    destination: "Tirthan",
    tagline: "Riverside cabins, forest walks and slow mountain days",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600",
    durationDays: 4,
    durationNights: 3,
    groupSize: "10-18",
    date: "18 Sep 2026",
    price: 9999,
    originalPrice: 12499,
    difficulty: "Easy",
    highlights: [
      "Riverside stay",
      "Great Himalayan National Park walk",
      "Bonfire nights",
      "Slow mornings by the stream",
    ],
    stay: "Riverside cabins in Tirthan Valley.",
    meetingPoint: "Aut Tunnel - 9:00 AM",
  }),
  buildTrip({
    slug: "goa-workation-escape",
    title: "Goa Workation Escape",
    region: "Goa",
    destination: "Assagao",
    tagline: "Emails by day, sunsets by design",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
    durationDays: 5,
    durationNights: 4,
    groupSize: "8-14",
    date: "07 Oct 2026",
    price: 14999,
    originalPrice: 17999,
    difficulty: "Easy",
    highlights: [
      "Work-friendly villa stay",
      "North Goa cafe crawl",
      "Sunset beach evenings",
      "Optional surf or pottery session",
    ],
    stay: "Work-friendly villa or boutique hostel.",
    meetingPoint: "Mopa Airport - 1:00 PM",
  }),
  buildTrip({
    slug: "goa-offbeat-north",
    title: "Goa Offbeat North",
    region: "Goa",
    destination: "Assagao",
    tagline: "Hidden beaches, creative corners and no rushed checklist",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
    durationDays: 5,
    durationNights: 4,
    groupSize: "8-14",
    date: "22 Dec 2026",
    price: 9999,
    originalPrice: 12999,
    difficulty: "Easy",
    highlights: [
      "Offbeat North Goa beaches",
      "Fontainhas walk",
      "Sunset shack evening",
      "Cafe and flea-market trail",
    ],
    stay: "Boutique hostel or villa in North Goa.",
    meetingPoint: "Mopa Airport - 1:00 PM",
  }),
  buildTrip({
    slug: "ziro-music-valley",
    title: "Ziro Music Valley",
    region: "Arunachal Pradesh",
    destination: "Ziro",
    tagline: "Music, mist, rice fields and the softest valley rhythm",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600",
    durationDays: 7,
    durationNights: 6,
    groupSize: "8-14",
    date: "24 Sept 2026",
    price: 19999,
    originalPrice: 23999,
    difficulty: "Easy",
    highlights: [
      "Ziro valley viewpoints",
      "Apatani village walk",
      "Music nights",
      "Paddy-field cycling",
    ],
    stay: "Local homestays and guesthouses.",
    meetingPoint: "Guwahati Railway Station - 8:00 AM",
  }),
  buildTrip({
    slug: "zanskar-frozen-river",
    title: "Zanskar Winter Expedition",
    region: "Ladakh",
    destination: "Zanskar",
    tagline: "Frozen trails, monastery stays and serious bragging rights",
    image: "https://images.unsplash.com/photo-1581793746485-04698e79a4e8?w=1600",
    durationDays: 8,
    durationNights: 7,
    groupSize: "6-10",
    date: "05 Feb 2027",
    price: 28999,
    originalPrice: 34999,
    difficulty: "Difficult",
    highlights: [
      "Frozen river stretches",
      "Remote monastery stays",
      "Winter Ladakh landscapes",
      "Small expedition group",
    ],
    stay: "Guesthouses and expedition camps.",
    meetingPoint: "Leh Airport - 10:00 AM",
  }),
  buildTrip({
    slug: "rishikesh-river-weekend",
    title: "Rishikesh River Weekend",
    region: "Uttarakhand",
    destination: "Rishikesh",
    tagline: "Rafting, cafes and a quick reset by the Ganga",
    image: "https://images.unsplash.com/photo-1586257244039-acc6f8c9d30b?w=1600",
    durationDays: 3,
    durationNights: 2,
    groupSize: "12-24",
    date: "14 Nov 2026",
    price: 6999,
    originalPrice: 8499,
    difficulty: "Easy",
    highlights: [
      "White-water rafting",
      "Ganga aarti evening",
      "Cafe hopping in Tapovan",
      "Short waterfall trail",
    ],
    stay: "Riverside camp or hostel stay.",
    meetingPoint: "Rishikesh Bus Stand - 11:00 AM",
  }),
  buildTrip({
    slug: "andaman-blue-trail",
    title: "Andaman Blue Trail",
    region: "Andaman",
    destination: "Havelock",
    tagline: "Clear water, quiet beaches and no spreadsheet energy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600",
    durationDays: 6,
    durationNights: 5,
    groupSize: "8-14",
    date: "12 Dec 2026",
    price: 26999,
    originalPrice: 31999,
    difficulty: "Easy",
    highlights: [
      "Radhanagar beach sunset",
      "Snorkel day",
      "Island cafe trail",
      "Blue-water ferry rides",
    ],
    stay: "Beachside guesthouses and boutique stays.",
    meetingPoint: "Port Blair Airport - 12:30 PM",
  }),
];

export function getTripBySlug(slug: string) {
  return trips.find((trip) => trip.slug === slug);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
