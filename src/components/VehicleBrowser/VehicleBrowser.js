import React from 'react';
import './VehicleBrowser.css';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, NavLink, Row} from 'reactstrap';
import Numeral from 'numeral';

class VehicleBrowser extends React.Component {

    render() {
        const vehicleSelections = this.props.vehicleData.map(item => {
           return <Col md={Math.ceil(12 / this.props.vehicleData.length)} key={`${item.detailKey}vb`}>
                <Card>
                    <CardImg top width="100%" src={item.thumbnail} alt={item.altText}/>
                    <CardBody>
                        <CardTitle>{item.year} {item.model}</CardTitle>
                        <CardSubtitle>{item.tagline}</CardSubtitle>
                        <CardText>Start at {Numeral(item.msrp).format('$0,0')}</CardText>
                        <NavLink href={`/detail/${item.detailKey}`}>Details</NavLink>
                        <NavLink href='build-and-price'>Build & Price</NavLink>
                        <NavLink href='/find-a-dealer'>Dealers Near You</NavLink>
                    </CardBody>
                </Card>
            </Col>
        });
        return (
            <div className='vehicle-browser'>
                <Container>
                    <Row>
                        {vehicleSelections}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default VehicleBrowser;
