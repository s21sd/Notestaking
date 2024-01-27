import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import { db, auth } from './Firebase';

const EditNotes = () => {
    type ParamsType = {
        id: any;
        title: string;
        desc: string
    };
    type newUpdateType = {
        title?: string;
        desc?: string;
    }

    const Navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState('');
    const [noteid, setNoteID] = useState('');

    const param_id = useParams<ParamsType>();
    const ide = param_id.id;
    const id = auth.currentUser?.uid;

    const postCollectionRef = collection(db, `${id}`);
    useEffect(() => {
        const getNotes = async () => {
            const data = await getDocs(postCollectionRef);
            const newdata = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log(newdata);
            const values = newdata[Number(ide)];
            let docId = values.id;
            setNoteID(docId);
            if (values && 'title' in values) {
                setTitle(values.title as string);
            }
            if (values && 'desc' in values) {
                setDesc(values.desc as string);
            }

        }
        getNotes()
    }, [param_id])


    const handleUpdateNotes = async (updatedData: newUpdateType) => {
        const noteRef = doc(db, `${id}`, noteid);

        try {
            await updateDoc(noteRef, updatedData);
            console.log('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const updateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: newUpdateType = {};

        if (title) updatedData.title = title;
        if (desc) updatedData.desc = desc;

        try {
            await handleUpdateNotes(updatedData);
            Navigate('/main')
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div>
            <Row className="align-items-center mb-4">
                <Col>
                    <p>{title}</p>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <button className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Edit</button>
                        </Link>
                        <Link to="/main">
                            <button className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100">Back</button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <FormControl value={title} onChange={(e) => setTitle(e.target.value)} required />

                            </Form.Group>
                        </Col>

                    </Row>
                    <Form.Group controlId="markdown">
                        <Form.Label>Note Down Here</Form.Label>
                        <FormControl value={desc} onChange={(e) => setDesc(e.target.value)} required as="textarea" rows={5} />

                    </Form.Group>
                    <Stack direction='horizontal' gap={2}>
                        <button onClick={updateNote} className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Update</button>
                        <Link to="/main">
                            <Button type='button' variant='outline-secondary'>Cancel</Button>
                        </Link>
                    </Stack>
                </Stack>

            </Form>
        </div>
    )
}

export default EditNotes