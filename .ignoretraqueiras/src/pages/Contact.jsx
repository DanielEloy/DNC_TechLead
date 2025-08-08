import { useContext} from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

// CONTEXT
import { AppContext } from "../contexts/AppContext"

function Contact(){
    const appContext = useContext(AppContext)
    return (
        <>  
         <Navbar />
         {/*  <Banner title={appContext.languages[appContext.language].menu.contact} image="contact.jpg"/> */}
            <div className="container">
                
            </div>
            <Footer />
        </>
    )
}

export default Contact;