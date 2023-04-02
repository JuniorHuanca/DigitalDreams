import styles from './LoaderPassword.module.css'
type Props = {}

const LoaderPassword = (props: Props) => {
    return (
        <div className="w-full h-full relative">
            <div className={`${styles.loader} border-[1px] dark:border-white border-black`}></div>
            <div className={`${styles.loader} border-[1px] dark:border-white border-black`}></div>
            <div className={`${styles.loader}`}></div>
        </div>

    )
}

export default LoaderPassword