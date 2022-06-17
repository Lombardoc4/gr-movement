import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';

import placeholderImg from './placeholder.png';

interface FormInputs {
    value: string | number,
    error: string
}

interface formValues {
    name: string,
    description: string,
    dod: Date,
    image: File
}

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const inputs = [
    { title: 'Image', type: 'file' },
    { title: 'Name', type: 'text' },
    { title: 'Description', type: 'textarea' },
    { title: 'Date of passing', type: 'date' },
];

// const validateInput(type: string, required: boolean): boolean {
//     if (type === 'string') {
//         return true;
//     }
//     return false;
// }
//     // return true;
// }

const getImageAspectRatio = (image: File): number => {
    const img = new Image();
    img.src = URL.createObjectURL(image);

    // let ratio = 1;

    img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        ratio = img.naturalWidth / img.naturalHeight;
        // URL.revokeObjectURL(img.src);
        // return aspectRatio;
        console.log(aspectRatio)
    };



    return ratio;

    // return img.width / img.height;
}



function App() {
    const [imageSrc, setImageSrc] = useState<string|null>(null);
    const [nameInput, setNameInput] = useState<FormInputs>({value: '', error: ''});
    const [descriptionInput, setDescriptionInput] = useState<FormInputs>({value: '', error: ''});
    const [ageInput, setAgeInput] = useState<FormInputs>({value: '', error: ''});
    // Ref = useRef<HTMLInputElement|null>(null);

    // const imageRef = useRef<HTMLInputElement|null>(null);
    // const imageRef = useRef<HTMLInputElement|null>(null);
    const imageRef = useRef<HTMLInputElement|null>(null);
    const nameRef = useRef<HTMLInputElement|null>(null);
    const descRef = useRef<HTMLTextAreaElement|null>(null);
    const ageRef = useRef<HTMLInputElement|null>(null);

    const ImageBtnRef = useRef<HTMLSpanElement|null>(null);
    const ImgPlaceholder = useRef<HTMLInputElement|null>(null);



    useEffect(() => {
        const fileUploadClick = (e: SyntheticEvent) => {
            if(e.which === 32 || e.which === 13){
                e.preventDefault();
                $('#fileupload').click();
            }
        }

        if (ImageBtnRef.current) {
            ImageBtnRef.current.addEventListener('keydown', fileUploadClick);
        }
        return () => {
            if (ImageBtnRef.current) {
                ImageBtnRef.current.removeEventListener('keydown', fileUploadClick);
            }
        }
    }, []);


    // Form Handling
    const handleSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();

        // Handle validation
        if (nameInput.value.length === 0) {
            setNameInput({...nameInput, error: 'This field is required'});
        }


        // const newSubmission = {
        //     name:        nameRef.current.value,
        //     description: descRef.current.value,
        //     date:        ageRef.current.value,
        //     image: imageSrc,
        // };
        // console.log('new Submission', newSubmission);
    };



    // Image Handling
    const handleImageChange = (e: SyntheticEvent) => {
        const file = (e.target as HTMLImageElement);
        const width = file.naturalWidth;
        const height = file.naturalHeight;
        const previewImg = document.querySelector('#image-preview img');
        if (previewImg) {
             previewImg.style.width = (width/height) > 1 ? '100%' : 'auto';
        }
        imageRef.current && imageRef.current.click();
    };

    const changeImage = (e: React.BaseSyntheticEvent) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType))
            return;

        const fileReader = new FileReader();
        fileReader.onload = (fileE) => {
            const { result } = fileE.target;
            result && setImageSrc(result);

            // Wdith / Height Ratio
            // const aspectRatio = getImageAspectRatio(file);
            const previewImg = document.querySelector('#image-preview img');

            // console.log(aspectRatio);

            // if (previewImg) {
            //     previewImg.style.width = aspectRatio > 1 ? '100%' : 'auto';
            // }
            // aspectRatio.then(ratio => {
            //     console.log('ratio',ratio);
            // }).catch(err => {
            //     console.log(err);
            // });

            ImgPlaceholder.current && ImgPlaceholder.current.setAttribute('placeholder', file.name);


        };

        fileReader.readAsDataURL(file);

    };


    return (
        <div className="App-main">

            {/* Image */}
            {imageSrc &&
            <div className='img-wrapper'>
                <div id="image-preview" className="img-container">
                    <span onClick={() => setImageSrc(null) } className='btn remove-btn' role="button" aria-controls="filename" tabIndex="0">Remove</span>
                    <img onLoad={handleImageChange} src={imageSrc} />
                </div>
            </div>

            }

            <form onSubmit={handleSubmit} id="addPersonForm">


                {/* Image Input */}
                <label htmlFor="filename" className="d-none">uploaded file</label>
                <input ref={ImgPlaceholder} className='d-none' type="text" id="filename" autoComplete="off" readOnly placeholder="no file uploaded"/>
                <label className='d-flex' htmlFor="fileupload" id="buttonlabel">
                    <span className='btn' style={{margin: '0 auto'}} ref={ImageBtnRef} role="button" aria-controls="filename" tabIndex="0">Upload Photo</span>
                </label>
                <input onChange={changeImage} className="d-none" id="fileupload" type="file" />


                {/* Name */}
                {/* <Input title="Name" type="text" value="" onChange={() => {}} /> */}
                <label htmlFor="name">Name: <span className='error-msg'>{nameInput.error}</span></label>
                <input type="text" name="name" required onChange={(e) => setNameInput({...nameInput, value: e.target.value})} />

                {/* Description */}
                <label htmlFor="description">Description: <span className='error-msg'>{descriptionInput.error}</span></label>
                <textarea ref={descRef} rows={4} />

                {/* Date */}
                <label htmlFor="age">Forever Age: </label>
                <input ref={ageRef} type="number" min={1} name="age" />

                {/* Submit */}
                <input className="btn" type="submit" value="Submit" />

                <hr/>

                <p className="gr-movement">Brought to you by The Global Recovery Movement</p>

            </form>
        </div>
    );
}

export default App;
