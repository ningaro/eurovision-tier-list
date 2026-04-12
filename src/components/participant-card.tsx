import { useDraggable } from "@dnd-kit/react";

interface ParticipantCardProps {
	id: string;
	country: string;
	flag: string;
	song: string;
	artist: string;
}

export function ParticipantCard({
	id,
	// country,
	flag,
	// song,
	// artist,
}: ParticipantCardProps) {
	const { ref } = useDraggable({
		id,
	});

	return (
		<div ref={ref} className="rounded-xl bg-transparent w-min z-10 inset-shadow-sm inset-shadow-gray-50/50 backdrop-blur-sm">
			{/* <p className="hidden md:block">{country}</p>
			<p className="hidden md:block">{song}</p>
			<p className="hidden md:block">{artist}</p> */}
			<p className="text-6xl text-center">{flag}</p>
		</div>
	);
}
