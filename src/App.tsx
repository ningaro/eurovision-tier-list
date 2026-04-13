import { DragDropProvider } from "@dnd-kit/react";
import {
	type ComponentProps,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { DefaultBox } from "@/components/default-box";
import { EventMode } from "@/components/event-mode";
import { Participants } from "@/components/participants";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { type EventSeed, PARTICIPANTS_BY_EVENT } from "@/data/participants";
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from "@/lib/storage";
import { ResetList } from "./components/reset-list";
import { Tiers } from "./components/tiers";
import {
	dropTierLetter,
	expandParticipantID,
	getParticipantsByEventID,
} from "./lib/utils";

function App() {
	const [eventID, setEventID] = useState<EventSeed["id"]>("first-semi");
	const [members, setMembers] = useState(
		getFromLocalStorage("first-semi") ??
			PARTICIPANTS_BY_EVENT["first-semi"]
				.map(getParticipantsByEventID)
				.map(expandParticipantID)
				.map(dropTierLetter),
	);

	const setMemberTear = useCallback(
		(id: string, letter: string) => {
			setMembers((value) => {
				const filtered = value.filter(({ id: memId }) => memId !== id);
				const changedMember = value.find(({ id: memId }) => memId === id);

				if (changedMember && changedMember.letter !== letter) {
					const updatedMembers = [...filtered, { ...changedMember, letter }];
					saveToLocalStorage(eventID, updatedMembers);
					return updatedMembers;
				}
				return value;
			});
		},
		[eventID],
	);

	const onDragEnd: ComponentProps<typeof DragDropProvider>["onDragEnd"] =
		useCallback(
			(e) => {
				if (e.canceled) return;

				const { target, source } = e.operation;
				if (target?.id && source?.id) {
					setMemberTear(source.id as string, target.id as string);
				}
			},
			[setMemberTear],
		);

	const onReset = useCallback(() => {
		removeFromLocalStorage(eventID);
		setMembers(
			PARTICIPANTS_BY_EVENT[eventID]
				.map(getParticipantsByEventID)
				.map(expandParticipantID)
				.map(dropTierLetter),
		);
	}, [eventID]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: members нужны, так как изменение кеша происходит при каждом изменение members
	const isMembersChanged = useMemo(
		() => !!getFromLocalStorage(eventID),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[eventID, members],
	);

	// Обновляем список участников, если был изменен тип мероприятия
	useEffect(() => {
		const storagedMembers = getFromLocalStorage(eventID);
		const newMembers =
			storagedMembers ??
			PARTICIPANTS_BY_EVENT[eventID]
				.map(getParticipantsByEventID)
				.map(expandParticipantID)
				.map(dropTierLetter);
		setMembers(newMembers);
	}, [eventID]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<DragDropProvider onDragEnd={onDragEnd}>
				<div className="px-4 py-2 flex gap-6 flex-col md:gap-12">
					<EventMode event={eventID} changeEvent={setEventID} />
					{isMembersChanged && <ResetList eventID={eventID} onReset={onReset} />}
					<DefaultBox>
						<Participants id="none" participantsList={members} />
					</DefaultBox>
					<Tiers members={members} />
				</div>
			</DragDropProvider>
		</ThemeProvider>
	);
}

export default App;
