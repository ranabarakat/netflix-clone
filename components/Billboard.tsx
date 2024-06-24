import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';

const Billboard = () => {

    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);



    return (
        <div className='relative h-[56.25vw]'>
            <video className='w-full h-[56.25vw] object-cover brightness-[60%]' autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
            <div className='absolute top-[30%] md:top-[40%] w-[50%] ml-4 md:ml-16 '>
                <p className='text-white text-1xl md:text-5xl h-full w-[100%] lg:text-6xl font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 width-[90%] md:width-[80%] lg:width-[50%] drop-shadow-xl'>
                    {data?.description}
                </p>
                <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
                    <PlayButton movieId={data?.id} />
                    <button onClick={handleOpenModal} className='bg-white bg-opacity-30 rounded-md py-1 md: py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold text-white flex flex-row gap-2 items-center hover:bg-opacity-20 transition '>
                        <AiOutlineInfoCircle />  More Info
                    </button>
                </div>
            </div>
        </div>
    )
};
export default Billboard;