import { Button, CSS, Spacer,Modal, Input, Row, Checkbox, Text  } from "@nextui-org/react"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import { useState } from "react"
import Scanner from "../../components/Scanner/Scanner"

export const getServerSideProps: GetServerSideProps = async(context: GetServerSidePropsContext) =>{

    const { eventDetails } = context.query
    return {
        props: {
            eventDetails
        }
    }
}

function EventDetails({
    eventDetails
}: InferGetServerSidePropsType<typeof getServerSideProps>){

    const ApprovedBtnStyles: CSS = {
        backgroundColor:"#5783db !important",
    }
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return(
        <div className="w-full p-6 max-w-[500px] my-0 mx-auto">
            
            <div className="w-full">
                <div className="w-full">
                    <Image 
                        src="https://ipfs.filebase.io/ipfs/QmXguQBn8kCqWReqRepshChn3LkdgbzHzZfw9Lc2Ztw738" 
                        className="rounded-lg"
                        width={500}
                        height={500} 
                        alt="" 
                    />
                </div>
                <Spacer y={1} />
                <div className="w-full">
                    <Button 
                        disabled
                        css={ApprovedBtnStyles}
                        className="w-full text-white"
                    >
                        No. of Approved : 25
                    </Button>
                    <Spacer y={1} />
                    <Button 
                        css={{backgroundColor: "#5dbea3 !important"}}
                        className="w-full text-white"
                        onClick={handler}
                    >
                        Scan
                    </Button>

                    {/* Scan Dialog Box */}
                    <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler} >
                        <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Palette
                        </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Scanner/>
                            <Button 
                                disabled
                                css={ApprovedBtnStyles}
                                className="w-full text-white"
                            >
                                No. of Approved : 25
                            </Button>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button auto flat color="error" onClick={closeHandler}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>

        </div>
    )
} 

export default EventDetails