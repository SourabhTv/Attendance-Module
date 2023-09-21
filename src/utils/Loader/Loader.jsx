import ClipLoader from "react-spinners/ClipLoader";
import './Loader.style.scss'
function Loader({ startLoader }) {
  return (
    startLoader && (
      <div className='loader-div'>
        <ClipLoader color="cyan" size={75} />
      </div>
    ) 
  )
}

export default Loader