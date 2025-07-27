
import './LoadingSpinner.css'
import LoadingSpinnerGIF from '../../assets/loadingSpinner.gif'

function LoadingSpinner() {
    return (
        <div className="d-flex al-center jc-center loading-overlay-container">
            <img src={LoadingSpinnerGIF} alt="carregando" height="80px"/>
        </div>
    )
}

export default LoadingSpinner;