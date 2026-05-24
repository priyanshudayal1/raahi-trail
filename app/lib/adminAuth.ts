import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "./firebaseAdmin";
import { hashPassword, verifyPassword } from "./password";

export type AdminRecord = {
  username: string;
  passwordHash: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  lastLoginAt?: unknown;
};

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export async function registerAdmin(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  const adminRef = getAdminDb().collection("admins").doc(normalizedUsername);
  const existingAdmin = await adminRef.get();

  if (existingAdmin.exists) {
    return { ok: false as const, error: "Username is already registered." };
  }

  const passwordHash = await hashPassword(password);

  await adminRef.set({
    username: normalizedUsername,
    passwordHash,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return { ok: true as const, username: normalizedUsername };
}

export async function verifyAdminLogin(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  const adminRef = getAdminDb().collection("admins").doc(normalizedUsername);
  const adminSnapshot = await adminRef.get();

  if (!adminSnapshot.exists) {
    return { ok: false as const, error: "Invalid username or password." };
  }

  const admin = adminSnapshot.data() as AdminRecord;
  const passwordMatches = await verifyPassword(password, admin.passwordHash);

  if (!passwordMatches) {
    return { ok: false as const, error: "Invalid username or password." };
  }

  await adminRef.update({
    lastLoginAt: FieldValue.serverTimestamp(),
  });

  return { ok: true as const, username: normalizedUsername };
}
