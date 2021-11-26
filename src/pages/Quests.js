import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../assets/styles/quests.css";
import BoxItem from "../components/BoxItem";
import boxIcon from "../assets/images/boxIcon.png";

export default function Quests() {

  const { state } = useLocation();
  const { id } = useParams();
  const quest = state?.quest;

  const navigate = useNavigate();

  if (!state || quest?._id.toString() !== id.toString()) {
    return (window.location = "/");
  }

  return (
    <div>
      <div className="contentContainer quests">
        <div className="contentHeader quests">
          <p className="title">Quests Order</p>
          {/* <p className="text-small">Proceed to packing orders</p> */}
        </div>

        <div className="contentBody quests">
          {Object.values(quest.orders).length
            ? Object.values(quest.orders).map((order) => {
                const shortOrderId = order._id.substring(0, 6).toUpperCase();
                const customerData = !order.customer ? null : order.customer;
                let userFullName = `Empty`;
                let userPhoneNumber = `Empty`;

                if (customerData) {
                  const { firstName, lastName, phoneNumber } = customerData;
                  userFullName = `${firstName} ${lastName}`;
                  userPhoneNumber = phoneNumber;
                }

                return (
                  <div
                    onClick={() => {
                      navigate("/orders/" + order._id, {
                        state: {
                          order: order,
                          quest: quest
                        },
                      });
                    }}
                    key={order._id}
                  >
                    <BoxItem
                      icon={boxIcon}
                      section1={userFullName}
                      section2={userPhoneNumber}
                      section3={order?.deliveryAddress?.name}
                      status={`Order #${shortOrderId}`}
                    />
                  </div>
                );
              })
            : null}
        </div>

        <div className="contentFooter quests">
          <button type="button" className="btn greenBtn">
            Start Quest
          </button>
        </div>
      </div>
    </div>
  );
}
