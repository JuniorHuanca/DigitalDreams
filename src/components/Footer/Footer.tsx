import Link from "next/link"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="flex justify-center items-center h-[10vh] w-full dark:bg-primary-700 bg-white">
      <p className="text-center ">© TODOS LOS DERECHOS RESERVADOS </p><span className="animate-bounce"><Link href={'https://juniorhuanca.vercel.app/'}> | JUNIOR HUANCA</Link></span>
    </footer>
  )
}

export default Footer