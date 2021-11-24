import React from 'react';
import '../assets/styles/quests.css';

export default function BoxItem({ id, icon, iconAltText, section1, section2, section3, status }) {
    return (
        <div key={id}>
            <div className="contentItem">
                <div className="item1">
                    <img src={icon} alt={iconAltText || "item icon"} />
                </div>
                <div className="item2">
                    <div className="section1">
                        {section1}
                    </div>
                    <div className="section2">
                        {section2}
                    </div>
                    <div className="section3">
                        {section3}
                    </div>
                </div>
            </div>
            {status ? <div className="badgeSection">
                <span className="badge badge-warning">{status}</span>
            </div> : null}
        </div>
    );
}
