import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ovalDot from "../assets/images/ovalDot.png";
import BackArrowIcon from "../assets/images/backArrowIcon.png";
import BoxItem from "../components/BoxItem";
import "../assets/styles/quests.css";

export default function OrderItem() {
  const { state } = useLocation();
  const { id } = useParams();
  const order = state?.order;
  const quest = state?.quest;
  const navigate = useNavigate();
  const [activeTagElement, setActiveTagElement] = useState(null);

  if (!state || order?._id.toString() !== id.toString()) {
    return (window.location = "/quests");
  }

  const shortOrderId = order._id.substring(0, 6).toUpperCase();

  const toggleCategories = (e, catData) => {
    if (e.nodeName.toLowerCase() !== "img") {
      if (activeTagElement) {
        activeTagElement.className = "";
      }

      if (activeTagElement === e) {
        e.className = "";
        setActiveTagElement(null);
      } else {
        e.className = "active";
        setActiveTagElement(e);
      }
    }
  };

  return (
    <div>
      <div className="contentContainer quests">
        <div className="contentHeader quests">
          <p className="title text-dark">
            <span
              className="navIcon"
              onClick={() => {
                navigate("/quests/"+quest._id, {
                  state: {
                    order: null,
                    quest: quest
                  },
                });
              }}
            >
              <img src={BackArrowIcon} alt="Back arrow" />
            </span>
            <span className="navTitle">Order #{shortOrderId}</span>
          </p>
          <div className="listBox">
            {order.products.length
              ? order.products.map((product) => {
                  const categories = product.product.categories;
                  const updatedCategories = [];
                  for (const category of categories) {
                    const catName = category.split("-")[0];
                    updatedCategories.push({
                      name: catName,
                      product: product.product._id,
                    });
                  }

                  return updatedCategories.map((catData, index) => {
                    return (
                      <div
                        key={index}
                        onClick={(e) => toggleCategories(e.target, catData)}
                      >
                        <img src={ovalDot} alt="oval dot" />
                        {catData.name}
                      </div>
                    );
                  });
                })
              : null}
          </div>
        </div>

        <div className="contentBody quests">
          {order.products.length
            ? order.products.map((product) => {
                return (
                  <div key={product._id} title={product.description}>
                    <BoxItem
                      icon={product.product.image.url}
                      iconAltText={product.product.image.altText}
                      section1={product.product.name}
                      section2={product.product.productLine2}
                      section3={product.product.categories}
                      status={order.status}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
