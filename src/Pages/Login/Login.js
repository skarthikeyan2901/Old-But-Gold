import React from 'react'
import {Col,Container,Row,Form,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import loginIcon from '../../images/userimg.jpg'
import img from '../../images/img.png'

function Login() {
  return (
    
        <Container className="mt-5">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center p-3 mt-5">
                    <img className="icon-img mb-2" src={loginIcon} alt="icon" />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button variant="outline-primary" type="submit" size="lg">
                                Login
                            </Button>
                            <div className='text-start' mt-3>
                                <a href="#"><small className='reset'>Dont have an account? Signup</small></a>
                            </div>
                        </div>
                        
                    </Form>

                </Col>
                <Col lg={8} md={6} sm={12}>
                    <img className='w-100' src={img} alt=""/>
                </Col>
            </Row>
        </Container>
    
  )
}

export default Login;