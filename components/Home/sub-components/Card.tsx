import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const EventCard = () => {

  const router = useRouter()

  const goToEventDetails = () =>{
    router.push('/event/test-event')
    console.log("Test")
  }

  return(
  <Card css={{ w: "100%",borderRadius: "0.5rem",cursor: "pointer" }} >
    <Card.Body css={{ p: 0 }} onClick={goToEventDetails}>
      <Card.Image
        src="https://ipfs.filebase.io/ipfs/QmXguQBn8kCqWReqRepshChn3LkdgbzHzZfw9Lc2Ztw738"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
    <Card.Footer
      onClick={goToEventDetails}
      isBlurred
      css={{
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text color="#000" size={10}>
            Palette
          </Text>
          <Text color="#000" size={10}>
            10 Dec 2022
          </Text>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
)}

export default EventCard