import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ESC_2026_PARTICIPANTS,
  type ParticipantID,
  type ParticipantSeed,
} from "@/data/participants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dropTierLetter(participant: ParticipantSeed) {
  return { ...participant, letter: "none" };
}

export function getParticipantsByEventID(participantID: ParticipantID) {
  return ESC_2026_PARTICIPANTS[participantID];
}

export function expandParticipantID(
  participant: ParticipantSeed,
  index: number,
) {
  return { ...participant, id: `${participant.id}-${index}` };
}
