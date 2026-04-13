import type { ParticipantSeed } from "@/data/participants";
import { Participants } from "./participants";
import { TierBox } from "./tier-box";

type Tier = {
	letter: string;
	color: string;
};

interface TiersProps {
	members: (ParticipantSeed & { letter: string })[];
}

const TIERS: Tier[] = [
	{ letter: "S", color: "red" },
	{ letter: "A", color: "orange" },
	{ letter: "B", color: "amber" },
	{ letter: "C", color: "yellow" },
	{ letter: "D", color: "lime" },
	{ letter: "E", color: "green" },
	{ letter: "F", color: "emerald" },
];

export function Tiers({ members }: TiersProps) {
	return (
		<div className="w-full flex gap-2 flex-col">
			{TIERS.map(({ letter, color }) => (
				<TierBox key={letter} id={letter} tierLetter={letter} color={color}>
					<Participants id={letter} participantsList={members} />
				</TierBox>
			))}
		</div>
	);
}
