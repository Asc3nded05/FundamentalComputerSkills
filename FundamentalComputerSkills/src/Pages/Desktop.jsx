import AppIcon from '../Components/AppIcon.jsx'
import Clock from '../Components/Clock.jsx'
import SideBar from '../Components/SideBar.jsx'
//import myImage from '../Assets/background-image.jpg'
import desktopIcon from '../assets/DesktopIconPlaceholder.png'

function Desktop() {
    return <>
        <div className="desktop-container">
            <AppIcon name="App Name 1" icon={desktopIcon}/>
            <AppIcon name="App Name 2 App Name 2" icon={desktopIcon}/>
            <AppIcon name="LongLongLongApp Name 3" icon={desktopIcon}/>




            <div className="navbar">
                <div className="navbar-left">
                    {/* Left-aligned widgets can go here */}
                </div>
                <div className="navbar-center">
                    <AppIcon name="App Name 1" icon={desktopIcon} variant = "taskbar"/>
                    <AppIcon name="App Name 2" icon={desktopIcon} variant = "taskbar"/>
                    <AppIcon name="App Name 3" icon={desktopIcon} variant = "taskbar"/>
                </div>
                <div className="navbar-right">
                    {/* Wifi, sound, bluetooth, battery, clock, etc */}
                    <Clock />
                </div>
            </div>

        </div>

        <div className="sidebar-container">
            <SideBar />
        </div>

        </> 
}
export default Desktop;
