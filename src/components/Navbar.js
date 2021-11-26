import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import HomeIcon from '../assets/images/homeIcon.png';
import RoundRingIcon from '../assets/images/roundRingIcon.png';
import PayoutIcon from '../assets/images/payoutIcon.png';
import ProfileIcon from '../assets/images/profileIcon.png';
import BellIcon from '../assets/images/bellIcon.png';
import LogoutIcon from '../assets/images/logoutIcon.png';
import '../assets/styles/navbar.css';

export default function Navbar() {
    const navigate = useNavigate();

    const navigationHandler = (location, state) => {
        navigate(
            location,
            {
                state
            }
        )
    }
    return (
        <>
            <div className="showOnMobile">
                <nav className="navbar navbar-expand-lg navbar-light navbarPc">
                    <div className="navbar-brand" onClick={() => navigationHandler('/')}><img src={Logo} alt="logo" /></div>
                </nav>
            </div>

            <div className="hideOnMobile">
                <nav className="navbar navbar-expand-lg navbar-light navbarPc">
                    <div className="navbar-brand" onClick={() => navigationHandler('/')}><img src={Logo} alt="logo" /></div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <div className="nav-link" onClick={() => navigationHandler('/')}>
                                    <div><img src={HomeIcon} alt="HomeIcon" /></div>
                                    <div>Home</div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={() => navigationHandler('/quests')}>
                                    <div><img src={RoundRingIcon} alt="RoundRingIcon" /></div>
                                    <div>Quests</div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <div><img src={PayoutIcon} alt="PayoutIcon" /></div>
                                    <div>Payouts</div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <div><img src={ProfileIcon} alt="ProfileIcon" /></div>
                                    <div>Account</div>
                                </div>
                            </li>
                        </ul>

                        <div className="listStyle rightSide">
                            <div className="text-center"><img src={BellIcon} alt="BellIcon" /></div>
                        </div>

                        <div className="logoutStyle rightSide">
                            <div className="text-center"><img src={LogoutIcon} alt="LogoutIcon" /></div>
                            <div>Logout</div>
                        </div>
                    </div>
                </nav>
            </div>


            <nav className="navbarMobile">
                <div className="navContainer">
                    <div>
                        <div className="nav-link mobileLink" onClick={() => navigationHandler('/')}>
                            <div><img src={HomeIcon} alt="HomeIcon" /></div>
                            <div>Home</div>
                        </div>
                    </div>
                    <div>
                        <div className="nav-link mobileLink" onClick={() => navigationHandler('/quests')}>
                            <div><img src={RoundRingIcon} alt="RoundRingIcon" /></div>
                            <div>Quests</div>
                        </div>
                    </div>
                    <div>
                        <div className="nav-link mobileLink">
                            <div><img src={PayoutIcon} alt="PayoutIcon" /></div>
                            <div>Payouts</div>
                        </div>
                    </div>
                    <div>
                        <div className="nav-link mobileLink">
                            <div><img src={ProfileIcon} alt="ProfileIcon" /></div>
                            <div>Account</div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}
