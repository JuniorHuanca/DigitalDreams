import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Layout from "@/components/Layouts/Layout";
import Recommended from "@/components/Home/Recommended";
import Brands from "@/components/Home/Brands";
import MostSelling from "@/components/Home/MostSelling";
import Filters from "@/components/Navbar/Filters";

type Props = {};
export default function Home(props: Props) {
  return (
    <Layout title={"Digital Dreams"}>
      <div className="w-full min-h-[90vh] flex flex-col">
        <Filters title="Home" />
        <MostSelling />
        <Brands />
        <Recommended />
      </div>
    </Layout>
  );
}
