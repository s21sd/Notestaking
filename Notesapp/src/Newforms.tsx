import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable';
import { db, auth } from './Firebase';
import { Link, useNavigate } from 'react-router-dom';

const Newforms = () => {
    const Navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<{ label: string, value: string }[]>([])
    const [desc, setDesc] = useState('');
    const id = auth.currentUser?.uid;
    const postCollectionRef = collection(db, `${id}`);

    const handleTagsChange = (newval: any) => {
        setTags(newval)
    }
    const createNote = async (e: any) => {
        e.preventDefault();
        const tagStrings = tags.map((tag) => tag.value);
        await addDoc(postCollectionRef, {
            title,
            desc,
            tags: tagStrings,
            author: { name: auth.currentUser?.displayName, id: auth.currentUser?.uid }
        });
        setTitle('');
        setDesc('');
        setTags([])
        Navigate('/main')

    }

    return (
        <Form>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <FormControl value={title} onChange={(e) => setTitle(e.target.value)} required />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>

                            <CreatableSelect value={tags} onChange={handleTagsChange} isMulti />

                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Note Down Here</Form.Label>
                    <FormControl value={desc} onChange={(e) => setDesc(e.target.value)} required as="textarea" rows={5} />

                </Form.Group>
                <Stack direction='horizontal' gap={2}>
                    <button onClick={createNote} className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Save</button>

                    <Link to="..">
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )
}

export default Newforms