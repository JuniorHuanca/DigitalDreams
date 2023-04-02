import styles from './LoaderPassword.module.css'
type Props = {}

const LoaderPassword = (props: Props) => {
    return (
        <div className="w-full h-full relative">
            <div className={`${styles.loader}`}></div>
            <div className={`${styles.loader}`}></div>
            <div className={`${styles.loader}`}></div>
        </div>

    )
}

export default LoaderPassword