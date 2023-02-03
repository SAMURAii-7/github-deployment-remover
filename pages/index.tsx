import Head from "next/head";
import Header from "../components/Header";
import UserInput from "../components/UserInput";

export default function Home() {
    return (
        <div className=" flex flex-col items-center bg-[#0d1117] text-[#c9d1d9] h-screen overflow-x-hidden max-md:overflow-y-hidden ">
            <Head>
                <title>Github Deployment Remover</title>
            </Head>
            <Header />
            <UserInput />
        </div>
    );
}
