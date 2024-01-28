import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row, Stack } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

type notestype = {
    title: string;
    id: string;
    desc: string;
    tags: any;
}
const Home = () => {
    const Navigate = useNavigate();

    const [notes, setNotesList] = useState<notestype[]>([])
    const [searchProduct, setSearchProduct] = useState("");
    const [filereredProduct, setfilereredProduct] = useState(notes);


    const id = auth.currentUser?.uid;
    const postCollectionRef = collection(db, `${id}`);
    useEffect(() => {
        const filtered = notes.filter(notes =>
            notes.title.toLowerCase().includes(searchProduct.toLowerCase())

        );
        setfilereredProduct(filtered);
    }, [searchProduct,notes]);

    useEffect(() => {
        const getNotes = async () => {
            const data = await getDocs(postCollectionRef);
            const newdata: notestype[] = data.docs.map((doc) => ({ id: doc.id, ...doc.data() } as notestype));
            setNotesList(newdata)
        }
        getNotes()
    }, [])

    const handleCardClick = (id: number) => {
        Navigate(`/${id}/edit`)
    };
    const handleDelteNote = async (index: number) => {
        const data = await getDocs(postCollectionRef);
        const newdata = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const values = newdata[index];
        const noteRef = doc(db, `${id}`, values.id);

        deleteDoc(noteRef).then(() => {
            // Fetch the updated data after deletion
            getDocs(postCollectionRef).then((updatedData) => {
                const updatedNotes: notestype[] = updatedData.docs.map((doc) => ({ id: doc.id, ...doc.data() } as notestype));
                setNotesList(updatedNotes);
            });
        }).catch((error) => {
            console.error('Error deleting note:', error);
        });
    };
    return (
        <div className=''>

            <Row className="align-items-center mb-4">
                <Col>
                    <h1 className='font-bold text-[#fc6d0b]'>NoteSwift</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <button className="rounded-lg px-4 py-2 bg-[#ec8947] text-white hover:bg-[#fc6d0b]duration-300">Create</button>
                        </Link>

                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            {/* <Form.Label
                                className='text-[#fc6d0b] '></Form.Label> */}
                            <Form.Control
                                placeholder="Search your Notes..."
                                type="text"
                                defaultValue={searchProduct}
                                className='w-[80%] m-auto'
                                onChange={(e) => setSearchProduct(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                </Row>
            </Form>

            <div className='flex flex-wrap'>
                {
                    searchProduct.length > 0 ? <>{
                        filereredProduct.map((item, index) => {
                            return (
                                <div key={index} className="text-gray-600 body-font">
                                    <div className="container mx-auto">

                                        <div className="flex flex-wrap ">
                                            <div className="p-4  w-full">
                                                <div className="h-full bg-[#f08f4e] p-8 rounded max-w-sm">
                                                    <div className='flex justify-between items-center mb-4'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5  " viewBox="0 0 975.036 975.036">
                                                            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                                        </svg>
                                                        <div className='flex gap-2'>
                                                            <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' style={{
                                                                fontSize: '20px'
                                                            }} onClick={() => handleCardClick(index)} />
                                                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer' style={{
                                                                fontSize: '20px'
                                                            }} onClick={() => handleDelteNote(index)} />
                                                        </div>
                                                    </div>
                                                    <p className="leading-relaxed mb-6 font-bold text-white">{item.title} </p>
                                                    <a className="inline-flex items-center">
                                                        <span className="flex-grow flex flex-col ">
                                                            <div className="title-font font-medium text-gray-100" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                                {item.desc}
                                                            </div>

                                                            <span className="text-white text-sm flex">
                                                                {
                                                                    item.tags.map((e: any, i: number) => {
                                                                        return (
                                                                            <Card.Text key={i} className=' font-bold p-2 shadow-lg rounded-full m-2 flex bg-gray-700'>
                                                                                {e}
                                                                            </Card.Text>
                                                                        )
                                                                    })
                                                                }
                                                            </span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )
                        })
                    }</>

                        : <>{
                            notes.map((item, index) => {
                                return (
                                    <div key={index} className="text-gray-600 body-font">
                                        <div className="container mx-auto">

                                            <div className="flex flex-wrap ">
                                                <div className="p-4  w-full">
                                                    <div className="h-full bg-[#f08f4e] p-8 rounded max-w-sm">
                                                        <div className='flex justify-between items-center mb-4'>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5  " viewBox="0 0 975.036 975.036">
                                                                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                                            </svg>
                                                            <div className='flex gap-2'>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' style={{
                                                                    fontSize: '20px'
                                                                }} onClick={() => handleCardClick(index)} />
                                                                <FontAwesomeIcon icon={faTrash} className='cursor-pointer' style={{
                                                                    fontSize: '20px'
                                                                }} onClick={() => handleDelteNote(index)} />
                                                            </div>
                                                        </div>
                                                        <p className="leading-relaxed mb-6 font-bold text-white">{item.title} </p>
                                                        <a className="inline-flex items-center">
                                                            <span className="flex-grow flex flex-col ">
                                                                <div className="title-font font-medium text-gray-100" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                                    {item.desc}
                                                                </div>

                                                                <span className="text-white text-sm flex">
                                                                    {
                                                                        item.tags.map((e: any, i: number) => {
                                                                            return (
                                                                                <Card.Text key={i} className=' font-bold p-2 shadow-lg rounded-full m-2 flex bg-gray-700'>
                                                                                    {e}
                                                                                </Card.Text>
                                                                            )
                                                                        })
                                                                    }
                                                                </span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                )
                            })
                        }
                        </>
                }


            </div>
        </div>
    )
}

export default Home

