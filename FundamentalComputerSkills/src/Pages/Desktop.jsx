import AppIcon from '../Components/AppIcon.jsx'
//import myImage from '../Assets/background-image.jpg'
import desktopIcon from '../Assets/DesktopIconPlaceholder.png'

function Desktop() {
    return <>
        {/* Put HTML here */}
        {/* <h1>Desktop Page</h1> */}
        <div className="desktop-container">
            <h1>Desktop</h1>
            <AppIcon name="NewAppName" desktopIcon={desktopIcon} iconStyling={"desktop-icon-styling"}/>


            <div className="navbar">
                Icons will go here
            </div>
        </div>
    </> 
}
export default Desktop;
