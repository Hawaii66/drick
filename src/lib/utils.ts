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

type Result<T> = {
    data:T,
    error:undefined
} | {
    data:null,
    error:string
}

export async function tryCatch<T>(fn: Promise<T>,config:{
    toast: boolean
}={toast:true}): Promise<Result<T>> {
    try {
        const data = await fn;
        return { error: undefined, data };
    } catch (err) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        if(config?.toast){
            if(err instanceof Error)
        {
            toast.error(`Server Error: ${message}`);
        }
            else{
                toast.error("An unknown error occurred");
            }
        }
        return { error: message, data: null };

    }
}
