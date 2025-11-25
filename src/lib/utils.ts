import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export function ToastError(e: unknown) {
    const message = e instanceof Error ? e.message : "An unknown error occurred";
    toast.error(`Server Error: ${message}`);

    return (e: unknown) => {
        const message = e instanceof Error ? e.message : "An unknown error occurred";
        toast.error(`Server Error: ${message}`);
    }
}
