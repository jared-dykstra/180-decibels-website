import React from 'react'
import { Col, Row } from 'reactstrap'

const items = [
  {
    src: 'https://www.arcurve.com/static/media/logo.c2d3b9c7.svg',
    altText: 'Arcurve'
  },
  {
    src:
      'https://vignette.wikia.nocookie.net/logopedia/images/1/14/RBC_Bank_logo.svg/revision/latest?cb=20141114150628',
    altText: 'RBC'
  },
  {
    src:
      'https://upload.wikimedia.org/wikipedia/en/8/88/Suncor_Energy_logo.svg',
    altText: 'Suncor'
  }
]

const Images = () => (
  <Row className="carousel">
    {items.map(i => (
      <Col md={4} className="my-auto">
        <img src={i.src} alt={i.altText} key={i.src} />
      </Col>
    ))}
  </Row>
)

export default Images
