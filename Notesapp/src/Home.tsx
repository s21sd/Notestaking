import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ReactSelect from "react-select"
import { useState } from 'react';
const Home = () => {
    const Navigate = useNavigate();
    const [title, setTitle] = useState("")
    const handleCardClick = () => {
        Navigate('/:id/edit')
    };
    return (
        <div>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button
                            variant="outline-secondary"
                        >
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Card
                onClick={handleCardClick}
                style={{ width: '15rem' }}
                className="mb-2"
            >

                <Card.Body>
                    <Card.Title>Card Title </Card.Title>
                    <Card.Text>

                        css javascript

                    </Card.Text>
                </Card.Body>
            </Card >
        </div>
    )
}

export default Home