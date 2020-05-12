import {Button, Container, Menu} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";

const NavBar =(props)=>(
    <Menu

        size='large'
    >
        <Container>
            <Menu.Item as='a' active >

                <Link to={'/'} className="nav-link"> Home </Link>
            </Menu.Item>
            <Menu.Item as='a' ><Link to={'/menuPlan'} className="nav-link">Menu plan</Link></Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item position='right'>
                <Button as='a' >
                    Log in
                </Button>
                <Button as='a'>
                    Sign Up
                </Button>
            </Menu.Item>
        </Container>
    </Menu>
)
export default NavBar;