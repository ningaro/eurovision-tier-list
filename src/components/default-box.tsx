import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react"

interface DefaultBoxProps {
    children: ReactNode
}

export function DefaultBox({children}:DefaultBoxProps) {
    const { ref } = useDroppable({
		id: 'none',
	});
   return <div ref={ref}>{children}</div>
}