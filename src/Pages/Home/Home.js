import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'

function Home() {
    return (
        <Container className='bg-img' >
            <NavBar />
        </Container>
    )
}

export default Home;