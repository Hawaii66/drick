import { PropsWithChildren } from "react";

export default function CenterScreen({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-center px-4">
            {children}
        </div>
    )
}
