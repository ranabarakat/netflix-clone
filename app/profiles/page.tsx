'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';




const Profiles = () => {

    const { data: user } = useCurrentUser();

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth');
        }
    }, [status, router]);


    if (status === "loading") {
        // Render nothing while loading
        return null;
    }

    if (status === "unauthenticated") {
        // Render nothing if unauthenticated (to avoid flash of content)
        return null;
    }
    return (
        <div className='flex items-center justify-center h-full'>
            <div className='flex flex-col'>
                <h1 className='text-3xl  md:text-6xl text-white text-center'> Who is watching?</h1>
                <div className='flex items-center justify-center mt-10 gap-8'>
                    <div onClick={() => { router.push('/') }}>
                        <div className='group flex-row w-44 mx-auto'>
                            <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                                <img src="/images/default-blue.jpg" alt=""></img>
                            </div>

                            <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Profiles;