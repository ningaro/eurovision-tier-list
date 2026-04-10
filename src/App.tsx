import { DragDropProvider } from "@dnd-kit/react";
import { type ComponentProps, useCallback, useState } from "react";
import { DefaultBox } from "@/components/default-box";
import { Participants } from "@/components/participants";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TierBox } from "@/components/tier-box";
import { ESC_2026_PARTICIPANTS } from "@/data/participants";

type Tier = {
	letter: string;
	color: string;
};

const tiers: Tier[] = [
	{ letter: "S", color: "red" },
	{ letter: "A", color: "orange" },
	{ letter: "B", color: "amber" },
	{ letter: "C", color: "yellow" },
	{ letter: "D", color: "lime" },
	{ letter: "E", color: "green" },
	{ letter: "F", color: "emerald" },
];

function App() {
	const [members, setMembers] = useState(
		ESC_2026_PARTICIPANTS.map((mem) => ({ ...mem, letter: "none" })),
	);

	const setMemberTear = useCallback((id: string, letter: string) => {
		setMembers((value) => {
			const filtered = value.filter(({ id: memId }) => memId !== id);
			const changedMember = value.find(({ id: memId }) => memId === id);

			if (changedMember) {
				return [...filtered, { ...changedMember, letter }];
			}
			return filtered;
		});
	}, []);

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

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<DragDropProvider onDragEnd={onDragEnd}>
				<div className="px-4 py-2 flex gap-2 flex-col">
					<DefaultBox>
						<Participants id="none" participantsList={members} />
					</DefaultBox>
					<div className="w-full flex gap-2 flex-col">
						{tiers.map(({ letter, color }) => (
							<TierBox
								key={letter}
								id={letter}
								tierLetter={letter}
								color={color}
							>
								<Participants id={letter} participantsList={members} />
							</TierBox>
						))}
					</div>
				</div>
			</DragDropProvider>
		</ThemeProvider>
	);
}

export default App;
