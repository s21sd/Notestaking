import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
const EditNotes = () => {
    return (
        <Row className="align-items-center mb-4">
            <Col>
                <p>CSS: Selectors </p>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                        variant="danger"
                    >
                        Delete
                    </Button>
                    <Link to="/">
                        <Button
                            variant="secondary"
                        >
                            Back
                        </Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
    )
}

export default EditNotes