import './HomePage.css'
import logo from '../images/logo.svg'

function HomePage() {
    const logoStyles = {width: '40px', height: '30px', padding: '5px'}

    return (
        <div className="homePage">
            <header>
                {/* <img src={logo} alt="LOGO" style={logoStyles} /> */}
                <label>POG</label>
            </header>
            <main className="main">
                <div className="button-panel">
                    
                </div>
                <div className="projects-list">

                </div>
            </main>
            <footer>

            </footer>
        </div>
    )
};

export default HomePage