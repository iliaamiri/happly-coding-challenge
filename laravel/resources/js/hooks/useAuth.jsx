import {useEffect, useState} from "react";
import {Loading} from "@/Components/Loading";

export function useAuth() {
    const [isFinished, setIsFinished] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            if (isFinished) {
                return;
            }
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('laravel_access_token')}`,
                }
            });
            const result = await response.json();
            if (result?.message === 'Unauthenticated.') {
                setIsFinished(true);
                return;
            }
            console.log('result: ', result)
            setUser(result);
            setIsFinished(true);
            console.log('auth: ', localStorage.getItem('laravel_access_token'))
        })();
    }, [isFinished]);

    return {isFinished, user};
}
