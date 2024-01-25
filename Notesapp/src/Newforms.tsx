import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
const Newforms = () => {
    return (
        <Form>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <FormControl required />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect isMulti />

                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Note Down Here</Form.Label>
                    <FormControl required as="textarea" rows={5} />

                </Form.Group>
                <Stack direction='horizontal' gap={2}>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to="..">
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )
}

export default Newforms