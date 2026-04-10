import type { ParticipantSeed } from "@/data/participants";
import { ParticipantCard } from "./participant-card";

interface ParticipantsProps {
	participantsList: (ParticipantSeed & { letter: string })[];
	id: string;
}

export function Participants({ id, participantsList }: ParticipantsProps) {
	return (
		<div className="grid grid-cols-4 gap-4 md:grid-cols-6 ">
			{participantsList
				.filter(({ letter }) => letter === id)
				.map(({ id, flag, song, artist, country }) => (
					<ParticipantCard
						key={id}
						id={id}
						flag={flag}
						country={country}
						song={song}
						artist={artist}
					/>
				))}
		</div>
	);
}
