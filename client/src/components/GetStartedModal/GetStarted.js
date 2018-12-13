import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

export default () => (
  <div>
    {' '}
    <Card>
      <CardHeader>Header</CardHeader>
      <CardBody>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button>
      </CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  </div>
)
