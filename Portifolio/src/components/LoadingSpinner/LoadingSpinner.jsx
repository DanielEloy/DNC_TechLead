
import './LoadingSpinner.css'
import LoadingSpinnerGIF from '../../assets/cabeca_animada_loading.gif'


function LoadingSpinner() {
    return (
        <div className="d-flex al-center jc-center loading-overlay-container">
            <img src={LoadingSpinnerGIF} alt="carregando" />
            <h1 className="loading-text">Carregando!!!</h1>
        </div>
    )
}

export default LoadingSpinner;