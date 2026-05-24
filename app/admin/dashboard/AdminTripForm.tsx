"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type SVGProps } from "react";
import { type Trip } from "../../lib/trips";

type TripDraft = {
  id: string;
  slug: string;
  title: string;
  region: string;
  destination: string;
  tagline: string;
  image: string;
  imagePublicId: string;
  durationDays: string;
  durationNights: string;
  groupSize: string;
  date: string;
  price: string;
  originalPrice: string;
  difficulty: string;
  stay: string;
  meetingPoint: string;
  highlights: string;
  included: string;
  excluded: string;
  itinerary: string;
  gallery: string;
  galleryPublicIds: string;
};

const emptyDraft: TripDraft = {
  id: "",
  slug: "",
  title: "",
  region: "",
  destination: "",
  tagline: "",
  image: "",
  imagePublicId: "",
  durationDays: "3",
  durationNights: "2",
  groupSize: "8-14",
  date: "",
  price: "",
  originalPrice: "",
  difficulty: "Easy",
  stay: "",
  meetingPoint: "",
  highlights: "",
  included: "",
  excluded: "",
  itinerary: "1 | Arrival and briefing | Meet the crew, settle in, and get the trip briefing.",
  gallery: "",
  galleryPublicIds: "",
};

export default function AdminTripForm({
  initialTrip,
  previousId,
}: {
  initialTrip?: Trip;
  previousId?: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<TripDraft>(() => tripToDraft(initialTrip));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function updateDraft(field: keyof TripDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function uploadImage(file: File, kind: "card" | "gallery") {
    setError("");
    setStatus(`Uploading ${kind === "card" ? "card" : "gallery"} image...`);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("kind", kind);
    formData.append("slug", draft.slug || slugify(draft.title) || "draft");

    const response = await fetch("/api/admin/images", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as {
      url?: string;
      publicId?: string;
      error?: string;
    };

    setIsUploading(false);

    if (!response.ok || !data.url || !data.publicId) {
      setStatus("");
      setError(data.error ?? "Unable to upload image.");
      return;
    }

    if (kind === "card") {
      if (draft.imagePublicId) {
        await deleteImageByPublicId(draft.imagePublicId);
      }

      setDraft((current) => ({
        ...current,
        image: data.url!,
        imagePublicId: data.publicId!,
      }));
    } else {
      setDraft((current) => ({
        ...current,
        gallery: [...toLines(current.gallery), data.url!].join("\n"),
        galleryPublicIds: [...toLines(current.galleryPublicIds), data.publicId!].join("\n"),
      }));
    }

    setStatus("Image uploaded to Cloudinary.");
  }

  async function deleteImageByPublicId(publicId: string) {
    if (!publicId) {
      return true;
    }

    const response = await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Unable to delete image.");
      return false;
    }

    return true;
  }

  async function removeCardImage() {
    setError("");
    const removedPublicId = draft.imagePublicId;
    const deleted = await deleteImageByPublicId(removedPublicId);

    if (!deleted) {
      return;
    }

    setDraft((current) => ({
      ...current,
      image: "",
      imagePublicId: "",
    }));
    setStatus(
      removedPublicId
        ? "Card image removed from Cloudinary."
        : "Card image removed from this trip.",
    );
  }

  async function removeGalleryImage(index: number) {
    setError("");
    const gallery = toLines(draft.gallery);
    const publicIds = toLines(draft.galleryPublicIds);
    const removedPublicId = publicIds[index];
    const deleted = await deleteImageByPublicId(removedPublicId);

    if (!deleted) {
      return;
    }

    gallery.splice(index, 1);
    publicIds.splice(index, 1);

    setDraft((current) => ({
      ...current,
      gallery: gallery.join("\n"),
      galleryPublicIds: publicIds.join("\n"),
    }));
    setStatus(
      removedPublicId
        ? "Gallery image removed from Cloudinary."
        : "Gallery image removed from this trip.",
    );
  }

  async function saveTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    setIsSaving(true);

    const trip = draftToTrip(draft);
    const response = await fetch("/api/admin/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trip, previousId }),
    });
    const data = (await response.json()) as { trip?: Trip; error?: string };

    setIsSaving(false);

    if (!response.ok || !data.trip) {
      setError(data.error ?? "Unable to save trip.");
      return;
    }

    setDraft(tripToDraft(data.trip));
    setStatus("Trip saved to Firebase.");
    router.push(`/admin/dashboard/trips/${data.trip.id}/edit`);
    router.refresh();
  }

  return (
    <div data-testid="admin-trip-form-page" className="pb-16">
      <section className="border-b border-black/10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink/65 hover:text-brand-ink"
          >
            <ArrowLeftIcon /> Back to dashboard
          </Link>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
                {previousId ? "Edit trip" : "Add trip"}
              </p>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-ink tracking-tight">
                Public trip details
              </h1>
            </div>
            <button
              form="admin-trip-form"
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-ink text-white font-semibold hover:bg-brand-green transition disabled:opacity-60"
            >
              <SaveIcon /> {isSaving ? "Saving..." : "Save trip"}
            </button>
          </div>
          {status || error ? (
            <p
              className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
              }`}
            >
              {error || status}
            </p>
          ) : null}
        </div>
      </section>

      <form
        id="admin-trip-form"
        onSubmit={saveTrip}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="bg-white border border-black/5 rounded-3xl p-5 sm:p-7 md:p-8">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={draft.title} onChange={(value) => updateDraft("title", value)} required />
            <Field label="Slug" value={draft.slug} onChange={(value) => updateDraft("slug", slugify(value))} required />
            <Field label="Region" value={draft.region} onChange={(value) => updateDraft("region", value)} required />
            <Field label="Destination" value={draft.destination} onChange={(value) => updateDraft("destination", value)} required />
            <Field label="Date" value={draft.date} onChange={(value) => updateDraft("date", value)} required />
            <Field label="Difficulty" value={draft.difficulty} onChange={(value) => updateDraft("difficulty", value)} required />
            <Field label="Duration days" type="number" value={draft.durationDays} onChange={(value) => updateDraft("durationDays", value)} required />
            <Field label="Duration nights" type="number" value={draft.durationNights} onChange={(value) => updateDraft("durationNights", value)} required />
            <Field label="Group size" value={draft.groupSize} onChange={(value) => updateDraft("groupSize", value)} required />
            <Field label="Price" type="number" value={draft.price} onChange={(value) => updateDraft("price", value)} required />
            <Field label="Original price" type="number" value={draft.originalPrice} onChange={(value) => updateDraft("originalPrice", value)} required />
            <Field label="Card image URL" value={draft.image} onChange={(value) => updateDraft("image", value)} required />
          </div>

          <ImageUploadPanel
            draft={draft}
            isUploading={isUploading}
            onRemoveCard={removeCardImage}
            onUpload={uploadImage}
          />

          <div className="mt-4 space-y-4">
            <TextArea label="Tagline" value={draft.tagline} onChange={(value) => updateDraft("tagline", value)} rows={2} required />
            <TextArea label="Stay details" value={draft.stay} onChange={(value) => updateDraft("stay", value)} rows={2} required />
            <TextArea label="Meeting point" value={draft.meetingPoint} onChange={(value) => updateDraft("meetingPoint", value)} rows={2} required />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <TextArea label="Highlights" hint="One highlight per line" value={draft.highlights} onChange={(value) => updateDraft("highlights", value)} rows={6} />
            <TextArea label="Gallery URLs" hint="One image URL per line" value={draft.gallery} onChange={(value) => updateDraft("gallery", value)} rows={6} />
            <TextArea label="Included" hint="One inclusion per line" value={draft.included} onChange={(value) => updateDraft("included", value)} rows={6} />
            <TextArea label="Excluded" hint="One exclusion per line" value={draft.excluded} onChange={(value) => updateDraft("excluded", value)} rows={6} />
          </div>

          <GalleryUploadPanel
            draft={draft}
            isUploading={isUploading}
            onRemove={removeGalleryImage}
            onUpload={uploadImage}
          />

          <div className="mt-4">
            <TextArea
              label="Itinerary"
              hint="One day per line: day | title | description"
              value={draft.itinerary}
              onChange={(value) => updateDraft("itinerary", value)}
              rows={8}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function ImageUploadPanel({
  draft,
  isUploading,
  onRemoveCard,
  onUpload,
}: {
  draft: TripDraft;
  isUploading: boolean;
  onRemoveCard: () => void;
  onUpload: (file: File, kind: "card" | "gallery") => void;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-black/10 bg-brand-paper p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/60">
            Card image upload
          </p>
          <p className="text-sm text-brand-ink/55 mt-1">
            Used on trip cards and the trip detail hero.
          </p>
        </div>
        <FileButton disabled={isUploading} label="Upload card image" multiple={false} onFiles={(files) => onUpload(files[0], "card")} />
      </div>
      {draft.image ? (
        <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={draft.image}
            alt=""
            className="h-28 w-40 rounded-2xl object-cover border border-black/10 bg-white"
          />
          <button
            type="button"
            onClick={onRemoveCard}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100"
          >
            <TrashIcon /> Delete card image
          </button>
        </div>
      ) : null}
    </div>
  );
}

function GalleryUploadPanel({
  draft,
  isUploading,
  onRemove,
  onUpload,
}: {
  draft: TripDraft;
  isUploading: boolean;
  onRemove: (index: number) => void;
  onUpload: (file: File, kind: "card" | "gallery") => void;
}) {
  const gallery = toLines(draft.gallery);

  return (
    <div className="mt-4 rounded-2xl border border-black/10 bg-brand-paper p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/60">
            Gallery image upload
          </p>
          <p className="text-sm text-brand-ink/55 mt-1">
            Upload one or more images for the trip detail gallery.
          </p>
        </div>
        <FileButton
          disabled={isUploading}
          label="Upload gallery"
          multiple
          onFiles={(files) => files.forEach((file) => onUpload(file, "gallery"))}
        />
      </div>
      {gallery.length > 0 ? (
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="rounded-2xl border border-black/10 bg-white p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className="h-28 w-full rounded-xl object-cover bg-brand-paper"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                <TrashIcon /> Delete image
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FileButton({
  disabled,
  label,
  multiple,
  onFiles,
}: {
  disabled: boolean;
  label: string;
  multiple: boolean;
  onFiles: (files: File[]) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-brand-ink font-semibold hover:border-brand-ink transition">
      <UploadIcon /> {disabled ? "Uploading..." : label}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          event.target.value = "";
          if (files.length > 0) {
            onFiles(files);
          }
        }}
      />
    </label>
  );
}

function tripToDraft(trip?: Trip): TripDraft {
  if (!trip) {
    return emptyDraft;
  }

  return {
    id: trip.id ?? "",
    slug: trip.slug,
    title: trip.title,
    region: trip.region,
    destination: trip.destination,
    tagline: trip.tagline,
    image: trip.image,
    imagePublicId: trip.imagePublicId ?? "",
    durationDays: String(trip.durationDays),
    durationNights: String(trip.durationNights),
    groupSize: trip.groupSize,
    date: trip.date,
    price: String(trip.price),
    originalPrice: String(trip.originalPrice),
    difficulty: trip.difficulty,
    stay: trip.stay,
    meetingPoint: trip.meetingPoint,
    highlights: trip.highlights.join("\n"),
    included: trip.included.join("\n"),
    excluded: trip.excluded.join("\n"),
    itinerary: trip.itinerary
      .map((day) => `${day.day} | ${day.title} | ${day.description}`)
      .join("\n"),
    gallery: trip.gallery.join("\n"),
    galleryPublicIds: trip.galleryPublicIds?.join("\n") ?? "",
  };
}

function draftToTrip(draft: TripDraft): Trip {
  const title = draft.title.trim() || "Untitled Trip";
  const image = draft.image.trim();
  const gallery = toLines(draft.gallery);
  const galleryPublicIds = toLines(draft.galleryPublicIds).slice(0, gallery.length);

  return {
    id: draft.id || undefined,
    slug: draft.slug.trim() || slugify(title),
    title,
    region: draft.region.trim(),
    destination: draft.destination.trim(),
    tagline: draft.tagline.trim(),
    image,
    imagePublicId: draft.imagePublicId || undefined,
    durationDays: toNumber(draft.durationDays, 1),
    durationNights: toNumber(draft.durationNights, 0),
    groupSize: draft.groupSize.trim(),
    date: draft.date.trim(),
    price: toNumber(draft.price, 0),
    originalPrice: toNumber(draft.originalPrice, toNumber(draft.price, 0)),
    difficulty: draft.difficulty.trim(),
    stay: draft.stay.trim(),
    meetingPoint: draft.meetingPoint.trim(),
    highlights: toLines(draft.highlights),
    included: toLines(draft.included),
    excluded: toLines(draft.excluded),
    itinerary: toItinerary(draft.itinerary),
    gallery: gallery.length > 0 ? gallery : image ? [image] : [],
    galleryPublicIds,
  };
}

function Field({
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-2 block"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm"
      />
    </div>
  );
}

function TextArea({
  hint,
  label,
  onChange,
  required,
  rows,
  value,
}: {
  hint?: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows: number;
  value: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2">
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 block"
        >
          {label}
        </label>
        {hint ? <span className="text-xs text-brand-ink/45">{hint}</span> : null}
      </div>
      <textarea
        id={id}
        rows={rows}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm leading-relaxed"
      />
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toNumber(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toItinerary(value: string): Trip["itinerary"] {
  const days = value
    .split("\n")
    .map((line, index) => {
      const [day, title, description] = line.split("|").map((part) => part.trim());
      return {
        day: toNumber(day, index + 1),
        title: title || `Day ${index + 1}`,
        description: description || "Trip experience details.",
      };
    })
    .filter((day) => day.title || day.description);

  return days.length > 0
    ? days
    : [{ day: 1, title: "Arrival", description: "Meet the crew and settle in." }];
}

function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></Icon>;
}

function SaveIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7H7v7" /><path d="M7 3v5h8" /></Icon>;
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></Icon>;
}

function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></Icon>;
}

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}
