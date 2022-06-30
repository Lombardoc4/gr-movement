import Form from "./Form";


const FormReplica = () => {

    return (
        <div className="form-main">
            <div className="form-container">
                <h1>The Drug Epidemic Memorial</h1>
                <p><em>
                    As the wind blows through the trees carrying the voices of those lost to the drug epidemic, may we always remember them, their grieving loved ones and those who continue to fight for recovery.
                </em></p>
                <p>
                    Words from devastated family members: the wind blows through the trees carrying the voices of those lost to the drug epidemic, may we always remember them, their grieving loved ones and those who continue to fight for recovery.
                </p>
                <p><em>
                    "I want this memorial to make the public aware of how deeply these souls were loved, and how unique and special each one of them was. That this loss is incomprehensible unless seen."
                </em>
                <br/>
                    -Geralyn Maul-Vasquez
                </p>
                <p><em>
                    "I want people to know that fentanyl took my child and I'm fighting to save theirs."
                </em>
                <br/>
                    -Shelly Hornsby
                </p>
                <h2>In loving memory to all the lost loved ones to this senseless drug epidemic.</h2>
                <h2>Please add your loved one's information to display on this virtual memorial wall.</h2>
                <p className="fine-print">*We ask that you be a member of the immediate family.</p>


                <Form/>
                <p>*Check your spam filter and add info@drugepidemicmemorial.org to your safelist to ensure email delivery.</p>
                <p>**Email a photo of your loved one with a title containing their name to info@drugepidemicmemorial.org.  If possible, kindly try to send only a photo without any graphics. Thank you.</p>

                <p className="fine-print">* Indicates required fields</p>
            </div>

            <p className="fine-print">Copyright 2022</p>
        </div>
    )
}

export default FormReplica;