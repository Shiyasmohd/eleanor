import { Spacer, Text } from "@nextui-org/react"
import Head from "next/head"
import Image from "next/image"
import QR from '../../public/qr.png'
import CreateIcon from '../../public/create-icon2.png'
import { useRouter } from "next/router"
import EventCard from './sub-components/Card'

const Home = () =>{

    const router = useRouter()

    const goToMyQR = () =>{
        router.push('/my-qr')
    }
    const goToCreateEvent = () =>{
        router.push('/create')
    }

    return(
        <div className="">
            <Head>
                <title>TickGate | Home</title>
            </Head>

            {/* Home Wrap  */}
            <div className="w-full p-6 max-w-[500px] my-0 mx-auto">

                {/* Main Buttons */}
                <div className="w-full flex justify-center gap-6 ">
                    <button
                        onClick={goToMyQR}
                        className="w-1/2 max-w-[250px] py-6 flex flex-col items-center gap-2 rounded-lg bg-[#5783db] shadow">
                        <div className="invert w-[45px]">
                            <Image src={QR} alt=""/>
                        </div>
                        <Text className="text-center font-poppins tracking-wider text-white ">
                            My QR
                        </Text>
                    </button>
                    <button 
                        onClick={goToCreateEvent}    
                        className="w-1/2 max-w-[250px] py-6 flex flex-col items-center gap-2 rounded-lg bg-[#5dbea3] shadow">
                        <div className="invert w-[45px]">
                            <Image src={CreateIcon} alt=""/>
                        </div>
                        <Text className="text-center font-poppins tracking-wider text-white ">
                            Create Event
                        </Text>
                    </button>
                </div>
                <Spacer y={2} />
                {/* Created Events */}
                <div className="w-full">
                    <h2 className="font-poppins text-left w-full text-2xl tracking-[1px]">
                        Created Events
                    </h2>
                    <Spacer y={1} />
                    <div className="w-full grid grid-cols-2 gap-2">
                        <EventCard />
                        <EventCard />
                        <EventCard />
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Home