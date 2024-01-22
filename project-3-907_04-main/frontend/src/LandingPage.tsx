import React, { useContext } from 'react';
import './LandingPage.css';
import { AuthContext } from './Auth';
import { Button } from '@mui/material';
import Carousel from "./components/CarouselComponent";

import image1 from "./components/assets/01.jpg";
import image2 from "./components/assets/02.jpg";
import image3 from "./components/assets/03.jpg";
import image4 from "./components/assets/04.jpg";
import image5 from "./components/assets/05.jpg";
import image6 from "./components/assets/06.jpg";
const imgs = [image1, image2, image3, image4, image5, image6];
import { Link } from 'react-router-dom';


export const LandingPage: React.FC = () => {
    const { role, signOut } = useContext(AuthContext);
    const customButtonStyle = {
        color: 'white',
    };

    return (
        <div className="landing-page background-image" >
            <div className="content">
                <div style={{ gridColumn: 2, gridRow: 1 }}>
                    <h1 className="notranslate">MESS WAFFLES</h1>
                    <h2>`Fall` in love with our Waffles.</h2>
                </div>
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_REACT_APP_API_KEY}&q=Mess+Waffles,College+Station,TX`}
                    allowFullScreen
                    style={{ filter: 'brightness(0.8)', gridColumn: 1, gridRow: 2, width: "100%", height: "100%", borderRadius: '10px', margin: "1em" }}
                    title="Google Maps"
                ></iframe>
                <div style={{ gridColumn: 2, gridRow: 3 }}>
                    <Carousel slides={imgs} />
                </div>
                <div style={{ gridColumn: 2, gridRow: 2 }}>
                    <Link to="/customer">
                        <Button style={customButtonStyle} id="order-here" className="button-hover-effect">
                            Order Here
                        </Button>
                    </Link>
                </div>
                <div style={{ gridColumn: 3, gridRow: 1, alignSelf: "start", justifySelf: "end", margin: '1.5em' }}>
                    {(role === "ROLE_admin" || role === "ROLE_manager" || role === "ROLE_server") ?
                        (
                            <Link to="/server">
                                <Button style={customButtonStyle} className="button-hover-effect">
                                    Server page
                                </Button>
                            </Link>
                        )
                        : (<div></div>)
                    }
                    {(role === "ROLE_admin" || role === "ROLE_manager") ?
                        (<Link to="/manager">
                            <Button style={customButtonStyle} className="button-hover-effect">
                                Manager page
                            </Button>
                        </Link>
                        )
                        : (<div></div>)
                    }
                    {
                        (role === "ROLE_admin") ?
                            (<Link to="/admin">
                                <Button style={customButtonStyle} className="button-hover-effect">
                                    Admin page
                                </Button>
                            </Link>
                            )
                            : (<div></div>)
                    }
                    {role === '' ?
                        (
                            <Link to="/login" >
                                <Button style={customButtonStyle} className="button-hover-effect">
                                    Login
                                </Button>
                            </Link>
                        )
                        : (
                            <Link to="/">
                                <Button style={customButtonStyle} className="button-hover-effect" onClick={signOut}>
                                    Logout
                                </Button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div >
    );
};

export default LandingPage;