import {Button, Container, Menu} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => 
{
    
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log(useAuth0())
    return (
        <div>
            <Menu size='large'>
                <Container>
                    <Menu.Item><Link to={'/'} className="nav-link"> Home </Link>
                    </Menu.Item>
                    {
                        isAuthenticated && (
                            <>
                            <Menu.Item><Link to={'/profile'} className="nav-link">Profile</Link></Menu.Item>
                            <Menu.Item><Link to={'/menuPlan'} className="nav-link">Menu plan</Link></Menu.Item>
                            <Menu.Item><Link to={'/pantry'} className="nav-link">Pantry</Link></Menu.Item>
                            </>
                        )
                    }
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