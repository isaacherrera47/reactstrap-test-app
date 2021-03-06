import React from 'react';
import './DealerLocator.css';
import Axios from 'axios';
import {
    Badge,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Row,
    Table
} from 'reactstrap';


class DealerLocator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: '', dealerships: null};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClearClicked = this.onClearClicked.bind(this);
        this.onListClick = this.onListClick.bind(this);
    }

    handleInputChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    onClearClicked(event) {
        event.preventDefault();
        this.setState({searchTerm: ''})
    }

    onListClick(event) {
        event.preventDefault();
        const stateClick = event.target.text.split(" ")[0];
        this.setState({searchTerm: stateClick});
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/dealerships')
            .then(res => {
                let stateCounter = res.data.reduce(function (dealerStateCount, dealer) {
                    dealerStateCount[dealer.state] = (dealerStateCount[dealer.state] || 0) + 1;
                    return dealerStateCount;
                }, this);
                this.setState({dealerships: res.data, stateCounter: stateCounter});
            }).catch(res => console.log(res));
    }

    render() {
        if (this.state.dealerships) {
            const filteredStubData = this.state.dealerships.filter(d => d.state.includes(this.state.searchTerm));
            let searchBar = <div>
                <h1>Over {this.state.dealerships.length} Authorized Dealers Nationwide</h1>
                <Row>
                    <Col sm={12} md={{size: 6, offset: 3}}>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="text" value={this.state.searchTerm} onChange={this.handleInputChange}
                                           name="user_address" placeholder="Search by state"/>
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={this.onClearClicked}>X</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>;
            if (this.state.searchTerm.length < 4) {
                let stateCounterMarkup = null;
                if (this.state.stateCounter) {
                    stateCounterMarkup = <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <ListGroup>
                                {Object.keys(this.state.stateCounter).sort().map(function (key, i) {
                                    if (typeof this.state.stateCounter[key] === 'number') {
                                        return (<ListGroupItem tag='a' href='#' key={key + i} onClick={this.onListClick}
                                                               className='justify-content-between'>
                                            {key} <Badge pill>{this.state.stateCounter[key]}</Badge>
                                        </ListGroupItem>)
                                    }
                                    return null;
                                }, this)}
                            </ListGroup>
                        </Col>
                    </Row>;
                }
                return (
                    <div>
                        {searchBar}
                        {stateCounterMarkup}
                    </div>
                )
            } else {
                return (
                    <div>
                        {searchBar}
                        <Row>
                            <Col sm={12} md={{size: 10, offset: 1}}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Dealership</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>ZIP</th>
                                        <th>Phone</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredStubData.map((item, i) => {
                                        return <tr key={item.phone}>
                                            <td>{String(i)}</td>
                                            <td>{item.dealershipName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{item.zip}</td>
                                            <td>{item.phone}</td>
                                        </tr>;
                                    })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}

export default DealerLocator;
