import React from 'react';
import { Container } from 'react-bootstrap';
import bgImage2 from '../../images/bgImage2.jpg';

function Home() {
    return (
        <Container >
            <img src={bgImage2} alt="icon" style={{ height:"100vh", width: "1280px" }}/>        
        </Container>
    )
}

export default Home;