import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap'
import { db, auth } from './Firebase';
import { Link, useNavigate } from 'react-router-dom';

const Newforms = () => {
    const Navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const id = auth.currentUser?.uid;
    const postCollectionRef = collection(db, `${id}`);
    const createNote = async (e: any) => {
        e.preventDefault();
        await addDoc(postCollectionRef, {
            title,
            desc,
            author: { name: auth.currentUser?.displayName, id: auth.currentUser?.uid }
        });
        setTitle('');
        setDesc('');
        Navigate('/main')

    }

    return (
        <Form>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label className='text-[#fc6d0b]'>Title:</Form.Label>
                            <FormControl value={title} onChange={(e) => setTitle(e.target.value)} required />

                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label className='text-[#fc6d0b]'>Note Down Here...</Form.Label>
                    <FormControl value={desc} onChange={(e) => setDesc(e.target.value)} required as="textarea" rows={5} />

                </Form.Group>
                <Stack direction='horizontal' gap={2}>
                    <button onClick={createNote} className="rounded-lg px-4 py-2 bg-[#ec8947]  hover:bg-[#fc6d0b] text-white  duration-300">Save</button>

                    <Link to="..">
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )
}

export default Newforms