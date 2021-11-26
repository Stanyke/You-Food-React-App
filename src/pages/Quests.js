import React, { useEffect } from "react";
import "../assets/styles/quests.css";
import BoxItem from "../components/BoxItem";
import useApp from "../store/contexts/AppContext";
import boxIcon from "../assets/images/boxIcon.png";
import { useNavigate } from "react-router-dom";

export default function Quests() {
  const {
    appState: { quests },
    getQuestsFromDb,
  } = useApp();

  const navigate = useNavigate();

  useEffect(() => {
    getQuestsFromDb();
  }, []);

  return (
    <div>
      <div className="contentContainer quests">
        <div className="contentHeader quests">
          <p className="title">Ongoing Quest</p>
          <p className="text-small">Proceed to packing orders</p>
        </div>

        <div className="contentBody quests">
          {Object.values(quests).length
            ? Object.values(quests).map((quest) => {
                return Object.values(quest.orders).length
                  ? Object.values(quest.orders).map((order) => {
                      const shortOrderId = order._id
                        .substring(0, 6)
                        .toUpperCase();
                      return (
                        <div
                          onClick={() => {
                            navigate("/orders/" + order._id, {
                              state: {
                                order: order,
                              },
                            });
                          }}
                          key={order._id}
                        >
                          <BoxItem
                            icon={boxIcon}
                            section1={order.deliveryAddress.name}
                            section2={order.status}
                            section3={new Date(
                              order.createdAt
                            ).toLocaleDateString("en-US")}
                            status={`Order #${shortOrderId}`}
                          />
                        </div>
                      );
                    })
                  : null;
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
