import "server-only";

import { createHash } from "crypto";

type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.",
    );
  }

  return { cloudName, apiKey, apiSecret };
}

export async function uploadCloudinaryImage(file: File, folder: string) {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signCloudinaryParams({ folder, timestamp }, apiSecret);
  const body = new FormData();

  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("folder", folder);
  body.append("timestamp", timestamp);
  body.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const result = (await response.json()) as CloudinaryUploadResult;
  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
}

export async function deleteCloudinaryImage(publicId?: string) {
  if (!publicId) {
    return;
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signCloudinaryParams({ public_id: publicId, timestamp }, apiSecret);
  const body = new URLSearchParams({
    api_key: apiKey,
    public_id: publicId,
    timestamp,
    signature,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error("Cloudinary delete failed.");
  }
}

export async function deleteCloudinaryImages(publicIds: Array<string | undefined>) {
  await Promise.all(
    Array.from(new Set(publicIds.filter(Boolean))).map((publicId) =>
      deleteCloudinaryImage(publicId),
    ),
  );
}

function signCloudinaryParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");
}
