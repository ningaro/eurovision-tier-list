import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface TierBoxProps {
	id: string;
	tierLetter: string;
	color: string;
	children: ReactNode;
}

export function TierBox({ id, tierLetter, color, children }: TierBoxProps) {
	const { ref } = useDroppable({
		id,
	});

	return (
		<div
			ref={ref}
			className={`w-full min-h-30 bg-${color}-800 rounded-xl flex items-center justify-center relative py-4`}
		>
			<div className="absolute text-8xl font-bold bg-clip-text text-background z-0">
				{tierLetter}
			</div>
			<div>{children}</div>
		</div>
	);
}
