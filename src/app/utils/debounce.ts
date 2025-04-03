
// está desabilitado 
import { useRef } from "react";

export default function useDebounce(delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    function debounceFn(setState: React.Dispatch<React.SetStateAction<string | number>>, string: string, middleware: (string: string, setState: React.Dispatch<React.SetStateAction<string | number>>) => void) {
        console.log(timeoutRef)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Limpa o timeout anterior impedindo de acontecer
        }
        if(middleware) {
            timeoutRef.current = setTimeout(() => {
                middleware(string, setState);
                
            }, delay);
            
        } else {
            timeoutRef.current = setTimeout(() => {
                setState(string);
            }, delay);
        }
        timeoutRef.current = null;
    }

    return debounceFn;
}