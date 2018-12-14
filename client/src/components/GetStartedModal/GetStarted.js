import React from 'react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'
import Button from '@material-ui/core/Button'

export default () => (
  <div>
    {' '}
    <Card>
      <CardHeader>Header</CardHeader>
      <CardBody>
        <CardTitle>Choose a Time that works for you...</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  </div>
)
