import Layout from "@/components/Layouts/Layout"

type Props = {}

const home = (props: Props) => {
    return (
        <Layout title={'Home'}>
            <div>home</div>
            <button name="btn" onClick={(e) => console.log(e.target)}>target</button>
        </Layout>
    )
}

export default home