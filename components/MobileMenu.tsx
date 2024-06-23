
import React from 'react';


interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {

    if (!visible) {
        return null;
    }

    return (
        <div className='bg-black bg-opacity-60 w-56 absolute top-8 left-0 py-4 flex-col border-1 border-gray-900 flex'>
            <div className='flex flex-col gap-4'>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    Home
                </div>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    TV Shows
                </div>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    Movies
                </div>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    New & Popular
                </div>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    My List
                </div>
                <div className='px-3 py-3 text-center text-white hover:bg-gray-900 hover:bg-opacity-60'>
                    Browse by Languages
                </div>

            </div>
        </div>
    )
};

export default MobileMenu;