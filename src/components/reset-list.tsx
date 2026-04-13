import { EVENTS, type EventSeed } from "@/data/participants";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ResetListProps {
	onReset: React.MouseEventHandler<HTMLButtonElement>;
	eventID: EventSeed["id"];
}

export function ResetList({ onReset, eventID }: ResetListProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<button className="text-xl w-full px-2 py-1 rounded-xl border border-border text-red-400" type="button">
					Reset List
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently reset tier list
						for "{EVENTS[eventID].name}".
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onReset}>Reset</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
