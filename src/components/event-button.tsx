import type { ReactNode } from "react";

interface EventButtonProps {
    isActive: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
}

export function EventButton({ isActive, onClick, children }: EventButtonProps) {
	return (
		<button
			className={`text-xl w-max px-2 py-1 ${isActive && "text-neutral-700"}`}
			type="button"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
