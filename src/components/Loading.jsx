import { Mosaic } from 'react-loading-indicators';
import '../css/Loading.css';
function Loading() {
    return (
        <div className="loading">
            <Mosaic color="#367588" size="medium" text="" textColor="" />
        </div>
    )
}
export default Loading;