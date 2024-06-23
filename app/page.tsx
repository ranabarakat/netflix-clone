"use client";

import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
// import { getSession, signOut } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       }
//     }
//   }
//   return { props: {} }
// }
export default function Home() {

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
    <>
      <Navbar />
    </>
  );
}
