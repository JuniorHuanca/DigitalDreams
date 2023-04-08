import NotFound404 from '@/assets/404.gif'
import NotFound404Mobile from '@/assets/404Mobile.gif'
import NotFound404Dark from '@/assets/404Dark.gif'
import NotFound404DarkMobile from '@/assets/404MobileDark.gif'
import useMediaQuery from '@/shared/util/useMediaQuery'
import Image from 'next/image'
import { useTheme } from '@mui/material'
import { ITheme } from '@/shared/util/types'
import Layout from '@/components/Layouts/Layout'

type Props = {}

const PageNotFound = (props: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 620px)");
    const theme: ITheme = useTheme();
    const { mode } = theme.palette;
    return (
        <Layout tittle={'Error 404 - Digital Dreams'}>
            <div className='relative w-full h-[90vh] flex justify-center items-center'>
                {mode === 'dark' && <Image src={isAboveMediumScreens ? NotFound404Dark : NotFound404DarkMobile} alt='Error' fill priority={true} />}
                {mode !== 'dark' && <Image src={isAboveMediumScreens ? NotFound404 : NotFound404Mobile} alt='Error' fill priority={true} />}
            </div>
        </Layout>
    )
}

export default PageNotFound