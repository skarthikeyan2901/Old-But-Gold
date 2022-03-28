import React from 'react'
import {Col,Container,Row,Form,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'
import loginIcon from '../../images/userimg.jpg'
import img from '../../images/img.png'

function SignUp() {
  return (
    
        <Container className="mt-5">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center p-3 mt-5">
                    <img className="icon-img" src={loginIcon} alt="icon" />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCPassword">
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button variant="outline-primary" type="submit" size="lg">
                                SignUp
                            </Button>
                            <div className='text-start' mt-3>
                                <a href="#"><small className='reset'>Already have an account?Login</small></a>
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

export default SignUp;