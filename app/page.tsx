"use client";

// import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
// import { getSession, signOut } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import InfoModal from '@/components/InfoModal';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';




export default function Home() {

  // const { data: user } = useCurrentUser();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();



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
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favorites} title="My List" />

      </div>
    </>
  );
}
