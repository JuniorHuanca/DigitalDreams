import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import styles from "./SignIn.module.css"
type Props = {
    providers: any
}
function SignIn({ providers }: Props) {
    return (
        <>
            {Object.values(providers).map((provider: any) => (
                <div key={provider.name} className={styles.container}>
                    <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/dashboard" })}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default SignIn