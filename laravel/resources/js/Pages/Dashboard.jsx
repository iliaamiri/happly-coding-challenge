import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from "react";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const fetchNewKanyeQuote = async () => { // Promise <null | string>
    try {
        const response = await fetch(
            '/api/newQuote', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    'Authorization': `Bearer ${localStorage.getItem('laravel_access_token')}`,
                },
            });
        const data = await response.json();
        return data.quote;
    } catch (e) {
        console.error('getNewKanyeQuote errored: ', e);
        return null;
    }
};

export default function Dashboard(props) {
    const [currentKanyeQuote, setCurrentKanyeQuote] = useState(null); // null | string

    useEffect(() => {
        (async () => {
            await handleGetNewQuote();
        })();
    }, []);

    const handleGetNewQuote = async () => {
        const newKanyeQuote = await fetchNewKanyeQuote();
        if (newKanyeQuote === null) {
            console.log('Error fetching Kanye quote');
            return;
        }
        setCurrentKanyeQuote(newKanyeQuote);
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className={'text-3xl'}>Kanye Quote of the Day</h2>
                        </div>
                        <div className="p-5 text-gray-900">
                            <button onClick={handleGetNewQuote} type="button"
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                New Kanye Quote ✒️
                            </button>
                        </div>
                        <div className="p-6 text-gray-900">
                            <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                                <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-600"
                                     viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                        fill="currentColor"/>
                                </svg>
                                {(currentKanyeQuote === null) ? (
                                    <div role="status">
                                        <svg aria-hidden="true"
                                             className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    <p className={'text-gray-900'}>"{currentKanyeQuote}"</p>
                                )}
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
