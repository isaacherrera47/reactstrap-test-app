import React from 'react';
import './TestFlightForm.css';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon
} from "reactstrap";
import Axios from "axios";

class TestFlightForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showSuccess: false, showDanger: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.check : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    onSubmit(event) {
        event.preventDefault();
        Axios.post('http://localhost:3001/mailingList', {
            customerName: this.state.customerName,
            phone: this.state.phone,
            email: this.state.email,
            budget: this.state.budget
        }).then(res => this.setState({showSuccess: true, showDanger: false}))
            .catch(res => this.setState({showSuccess: false, showDanger: true}));
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Schedule a Test flight</CardTitle>
                        <CardSubtitle>No pilot's license required!</CardSubtitle>
                        <CardText>Fill out the form fields below to schedule a test flight</CardText>
                        <Form>
                            <FormGroup>
                                <Input type='text' onChange={this.handleInputChange} name='customerName'
                                       id='customerName' placeholder='Type your name'/>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Input type='text' onChange={this.handleInputChange} name='phone' id='phone'
                                       placeholder='Type your phone'/>
                            </FormGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>@</InputGroupAddon>
                                <Input type="text" onChange={this.handleInputChange} name='email' id='email'
                                       placeholder='Type your email'/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>$</InputGroupAddon>
                                <Input type="text" onChange={this.handleInputChange} name='budget' id='budget'
                                       placeholder='Type your budget'/>
                            </InputGroup>
                            <br/>
                        </Form>
                        <br/>
                        <Button className='submit-btn' onClick={this.onSubmit}>Submit</Button>
                        <Alert color='success' isOpen={this.state.showSuccess}>Your data were submitted
                            successfully</Alert>
                        <Alert color='danger' isOpen={this.state.showDanger}>Something went horribly wrong!</Alert>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TestFlightForm;
