import React from 'react'
import Sidebar from '../Profile/Sidebar'

interface Props {
    children: React.ReactNode;
}

const LayoutProfile = ({ children }: Props) => {
    return (
        <>
            <div className='flex w-full h-[90vh] p-4 gap-6'>
                <Sidebar />
                {children}
            </div>
        </>
    )
}

export default LayoutProfile