import React from 'react';
import './TopNav.css';
import {
    Collapse,
    DropdownItem, DropdownMenu, DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {Link} from "react-router-dom";

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const vehicleSelections = this.props.vehicleData.map(item => {
            return <DropdownItem key={item.detailKey}>
                <Link to={{pathname: `/detail/${item.detailKey}`}}>
                    {item.model}
                </Link>
            </DropdownItem>;
        }, this);
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Flying car dealership</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className="fas fa-home"/> Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fas fa-space-shuttle"/> Flying Cars
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {vehicleSelections}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/find-a-dealer"><i className="fas fa-map-marker-alt"/> Find A
                                    Dealer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/build-and-price'><i className="fas fa-cog"/> Build And Price</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;
