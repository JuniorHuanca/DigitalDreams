import React from 'react'
import Sidebar from '../Profile/Sidebar'
import { Toaster } from 'react-hot-toast';

interface Props {
    children: React.ReactNode;
}

const LayoutProfile = ({ children }: Props) => {
    return (
        <>
            <div className='flex w-full min-h-[90vh] sm:h-[90vh] p-1 gap-1 sm:p-4 sm:gap-6'>
                <Sidebar />
                {children}
            </div>
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
        </>
    )
}

export default LayoutProfile