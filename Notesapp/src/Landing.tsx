import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { auth, provider } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import Animation from "./assets/Animation - 1706349320714.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildReaching } from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from "react-icons/fc";
type loginProps = {
    isAuth: boolean
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
function Landing({ isAuth, setIsAuth }: loginProps) {
    const Navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true)
            console.log(result);
            Navigate('/main')
        })
    }
    const goMainPage = () => {
        {
            isAuth ? Navigate('/main') : toast.warning("Please Sign Up With Google ");
        }
    }
    return (
        <>

            <ToastContainer />
            <Navbar className="rounded-full">
                <Container>
                    <Navbar.Brand href="#home" className='font-bold text-[#fc6d0b]'>NoteSwift</Navbar.Brand>
                    {
                        isAuth ? <></> : <button onClick={signInWithGoogle} className="ml-4 inline-flex text-white bg-[#ec8947] border-0 py-2 px-6 focus:outline-none hover:bg-[#fc6d0b] rounded text-lg"><FcGoogle /></button>

                    }

                </Container>
            </Navbar>
            <div className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col ">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16  text-center">
                        <h1 className="title-font font-bold sm:text-4xl text-3xl mb-4 text-gray-900">Notes..

                        </h1>
                        <p className="mb-8 text-sm italic">Capturing Thoughts, Unleashing Ideas: Where Every Note Finds a Home.Your Thoughts, Your Notes, Your Space.</p>
                        <div className="flex justify-center items-center" >

                            <button onClick={goMainPage} className="inline-flex text-white bg-[#ec8947]  hover:bg-[#fc6d0b] border-0 py-2 px-6 rounded text-lg">Let's Start
                                <FontAwesomeIcon icon={faChildReaching} className='cursor-pointer ml-2 mt-1' style={{
                                    fontSize: '20px'
                                }} />
                            </button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
                        <Lottie animationData={Animation} loop={true} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Landing;