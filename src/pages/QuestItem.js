import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import itemIcon from '../assets/images/itemIcon.png';
import ovalDot from '../assets/images/ovalDot.png';
import BackArrowIcon from '../assets/images/backArrowIcon.png';
import BoxItem from '../components/BoxItem';
import '../assets/styles/quests.css';

export default function QuestItem() {
    const { state } = useLocation();
    const { id } = useParams();
    const quest = state?.quest;
    const navigate = useNavigate();


    if (!state || quest?._id.toString() !== id.toString()) {
        return window.location = '/quests';
    }

    return (
        <div>
            <div className="contentContainer quests">
                <div className="contentHeader quests">
                    <p className="title text-dark">
                        <span className="navIcon" onClick={() => {
                            navigate(
                                "/quests/",
                                {
                                    state: {
                                        quest: null
                                    }
                                }
                            )
                        }}><img src={BackArrowIcon} alt="Back arrow" /></span>
                        <span className="navTitle">Order #COFF3</span>
                    </p>
                    <div className="listBox">
                        <div><img src={ovalDot} alt="oval dot" />Drinks</div>
                        <div><img src={ovalDot} alt="oval dot" />Vegetarian</div>
                        <div><img src={ovalDot} alt="oval dot" />Livestock</div>
                    </div>
                </div>

                <div className="contentBody quests">
                    {
                        quest.orders.length ?
                            quest.orders.map((order) => {
                                return order.products.length ?
                                    order.products.map((product) => {
                                        return <BoxItem id={product._id} icon={product.product.image.url} iconAltText={product.product.image.altText} section1={product.product.name} section2={product.product.productLine2} section3={product.product.category} status={order.status} />
                                    }) : null
                            }) : null
                    }
                </div>
            </div>
        </div>
    );
}
