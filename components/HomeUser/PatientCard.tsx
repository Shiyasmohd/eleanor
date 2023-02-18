import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { Disease } from "./HomeUser";

export default function PatientCard(props: Disease){
    return(
        <Card css={{ mw: "330px" }}>
          <Card.Header>
            <Text b>{props.name}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
              {props.description}
            </Text>
          </Card.Body>
          <Card.Divider />
          {/* <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" light>
                Cancel
              </Button>
              <Button size="sm">Agree</Button>
            </Row>
          </Card.Footer> */}
        </Card>
    )
}