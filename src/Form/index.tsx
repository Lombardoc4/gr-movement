import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';

import placeholderImg from './placeholder.png'

interface formInputs {
    title: string,
    type: string
}

interface formValues {
    name: string,
    description: string,
    dod: Date,
    image: File
}

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const inputs = [
    { title: 'Image', type: 'file'},
    { title: 'Name', type: 'text'},
    { title: 'Description', type: 'textarea'},
    { title: 'Date of passing', type: 'date'},
]

function App() {
    const [image, setImage] = useState<string>(placeholderImg);
    
    const imageRef = useRef<HTMLInputElement|null>(null);
    const nameRef = useRef<HTMLInputElement|null>(null);
    const descRef = useRef<HTMLTextAreaElement|null>(null);
    const ageRef = useRef<HTMLInputElement|null>(null);
    
    
    // Form Handling
    const handleSubmit = (e : React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        // Handle validation
        
        const newSubmission = {
            name: nameRef.current.value,
            description: descRef.current.value,
            date: ageRef.current.value,
            image: image
        }
        console.log('new Submission', newSubmission)
    }
    
    // Image Handling
    const handleImageSelect = () => { 
        imageRef.current && imageRef.current.click();
    }
    
    const changeImage = (e: React.BaseSyntheticEvent) =>{
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            return;
        }
        
        let fileReader = new FileReader();
        fileReader.onload = (fileE) => {
            const { result } = fileE.target;
            result && setImage(result)
        }
        fileReader.readAsDataURL(file);
    }
    
    
    
    return (
        <div className="App-main">
            
            <form onSubmit={handleSubmit} id="addPersonForm">  
                
                {/* Name */}
                <label htmlFor='name'>Name:</label>
                <input ref={nameRef} type='text' name='name' required/>
                
                
                {/* Image */}
                <div className='img-container'>
                    <img style={{width: '100%'}} src={image}/>
                </div>
                <a onClick={handleImageSelect} className='btn' role="button" tabIndex={0}>Add Image</a>
                <input onChange={changeImage} ref={imageRef} className='w-100 d-none' type='file' name="imagery" required accept={"image/*"}/>
                
                
                {/* Description */}
                <label htmlFor='description'>Description:</label>
                <textarea ref={descRef} rows={6} required/>
                
                
                
                {/* Date */}
                <label htmlFor='age'>Forever Age:
                    <input ref={ageRef} type='number' name='age' required/>
                </label>
                
                {/* <hr/> */}
                
                {/* Submit */}
                <input className='btn' type="submit" value="Submit"/>
                
            </form>
        </div>
    )
}

export default App
