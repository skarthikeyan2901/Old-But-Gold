import React from "react";
import { Container, Navbar } from "react-bootstrap"

function NavBar() {
    return (
        <div>
            <Navbar bg="light" variant="dark">
                <Navbar.Brand style={{color: "black"}}>
                    <div className="d-flex justify-content-between" style={{width: "1200px"}}>
                        <div>
                            OBG
                        </div>
                        <div className="d-flex">
                            Signup
                            Login
                        </div>
                    </div>
                </Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default NavBar;