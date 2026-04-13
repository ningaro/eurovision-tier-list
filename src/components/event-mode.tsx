import { EVENTS, type EventSeed } from "@/data/participants";
import { EventButton } from "./event-button";

interface EventModeProps {
	event: EventSeed["id"];
	changeEvent: React.Dispatch<React.SetStateAction<EventSeed["id"]>>;
}

export function EventMode({ event, changeEvent }: EventModeProps) {
	return (
		<div className="self-center flex items-center flex-col gap-4 md:flex-row md:justify-center w-full rounded-xl border border-border">
			{Object.values(EVENTS).map(({ id, name }) => (
				<EventButton
					isActive={event === id}
					key={id}
					onClick={() => changeEvent(id)}
				>
					{name}
				</EventButton>
			))}
		</div>
	);
}
