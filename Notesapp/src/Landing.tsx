import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { auth, provider } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import React from 'react';
type loginProps = {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
function Landing({ setIsAuth }: loginProps) {
    const Navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true)
            console.log(result);
            Navigate('/main')
        })
    }
    return (
        <>

            <Navbar className="rounded-full">
                <Container>
                    <Navbar.Brand href="#home">MyNotes</Navbar.Brand>
                    <button onClick={signInWithGoogle} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Sign Up</button>

                </Container>
            </Navbar>
            <div className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Notes..

                        </h1>
                        <p className="mb-8 leading-relaxed">Create your Notes</p>
                        <div className="flex justify-center" >
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Let's Start</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Landing;