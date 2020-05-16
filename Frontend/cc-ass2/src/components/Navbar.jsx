import {Button, Container, Menu} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => 
{
    
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            <Menu size='large'>
                <Container>
                    <Menu.Item as='a' active >
                        <Link to={'/'} className="nav-link"> Home </Link>
                    </Menu.Item>
                    <Menu.Item as='a' ><Link to={'/menuPlan'} className="nav-link">Menu plan</Link></Menu.Item>
                    <Menu.Item as='a'>Company</Menu.Item>
                    <Menu.Item as='a'>Careers</Menu.Item>
                    <Menu.Item position='right'>

                    {!isAuthenticated && (
                        <Button as='a' onClick={() => loginWithRedirect({})}>Log in </Button>
                    )}
                    {isAuthenticated && (
                        <Button as='a' onClick={() => logout()}>Logout</Button>
                    )}
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    );
}

export default NavBar;