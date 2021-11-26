import React from 'react';
import '../assets/styles/dashboard.css';
import QuestImage from '../assets/images/quest.png';

export default function Dashboard() {
    return (
        <div>
            <div className="contentContainer dashboard">
                <div className="contentHeader dashboard">
                    <p>Good evening, <span className="name">John</span></p>
                    <p className="text-small">Welcome to Youshopper. Accept a quest to get <br /> started right away.</p>
                </div>

                <div className="contentBody dashboard">

                    <p className="text-title">Quests</p>
                    <div className="firstSection">
                        <div className="item">
                            <img src={QuestImage} alt='quest' />
                        </div>
                        <div className="item2">
                            <p>Quest</p>
                            {/* <div>45 minutes remaining</div> */}
                        </div>
                    </div>

                    <p className="text-title">Quest stats</p>
                    <div className="secondSection">
                        <div className="first">
                            <p className="text-title-bold">Total Quests</p>
                            <p className="text-bold">5</p>
                            {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
                        </div>
                        <div className="second">
                            <p className="text-title-bold">Completed Quests</p>
                            <p className="text-bold">30</p>
                            {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
                        </div>
                        <div className="third">
                            <p className="text-title-bold">Picked up Quests</p>
                            <p className="text-bold">30</p>
                            {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
