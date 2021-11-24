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
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="navbar-brand" onClick={() => navigationHandler('/')}><img src={Logo} alt="logo" /></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <div className="nav-link" onClick={() => navigationHandler('/')}><div><img src={HomeIcon} alt="HomeIcon" /></div>
                                <div>Home</div></div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => navigationHandler('/quests')}><div><img src={RoundRingIcon} alt="RoundRingIcon" /></div>
                                <div>Quests</div></div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><div><img src={PayoutIcon} alt="PayoutIcon" /></div>
                                <div>Payouts</div></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><div><img src={ProfileIcon} alt="ProfileIcon" /></div>
                                <div>Account</div></a>
                        </li>
                    </ul>

                    <div className="listStyle rightSide">
                        <div className="text-center"><img src={BellIcon} alt="BellIcon" /></div>
                    </div>

                    <a href="#" className="logoutStyle rightSide">
                        <div className="text-center"><img src={LogoutIcon} alt="LogoutIcon" /></div>
                        <div>Logout</div>
                    </a>
                </div>
            </nav>

        </>
    );
}
