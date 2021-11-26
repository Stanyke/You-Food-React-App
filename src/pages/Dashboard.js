import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/dashboard.css";
import QuestImage from "../assets/images/quest.png";
import useApp from "../store/contexts/AppContext";

export default function Dashboard() {
  const {
    appState: { quests },
    getQuestsFromDb,
  } = useApp();

  const navigate = useNavigate();

  const [availableQuests, setAvailableQuests] = useState([]);
  const [questsStats, setQuestsStats] = useState(null);

  useEffect(() => {
    getQuestsFromDb();
  }, [getQuestsFromDb]);

  useEffect(() => {
    if (Object.values(quests).length) {
      const sortedQuests = Object.values(quests).sort(
        (a, b) => b.updatedAt - a.updatedAt
      );

      let broadcastedQuests = sortedQuests.filter((questData) => {
        return questData.status.toLowerCase() === "broadcasting";
      });

      const completedQuests = sortedQuests.filter((questData) => {
        return questData.status.toLowerCase() === "completed";
      });

      const onGoingQuests = sortedQuests.filter((questData) => {
        return (
          questData.status.toLowerCase() === "active" ||
          questData.status.toLowerCase() === "processing"
        );
      });

      const updatedQuestsStats = {
        incoming: broadcastedQuests.length ? broadcastedQuests.length : 0,
        completed: completedQuests.length ? completedQuests.length : 0,
        onGoing: onGoingQuests.length ? onGoingQuests.length : 0,
      };

      setQuestsStats(updatedQuestsStats);

      broadcastedQuests = broadcastedQuests.slice(0, 4);

      setAvailableQuests(broadcastedQuests);
    } else {
      setAvailableQuests([]);
      setQuestsStats(null);
    }
  }, [quests]);

  return (
    <div>
      <div className="contentContainer dashboard">
        <div className="contentHeader dashboard">
          <p>
            Good evening, <span className="name">John</span>
          </p>
          <p className="text-small">
            Welcome to Youshopper. Accept a quest to get <br /> started right
            away.
          </p>
        </div>

        <div className="contentBody dashboard">
          <div className="allQuestsContainer">
            {Object.values(availableQuests).length ? (
              <p className="text-title">Quests</p>
            ) : null}
            {Object.values(availableQuests).length
              ? Object.values(availableQuests).map((quest) => {
                  const shortQuestId = quest._id.substring(0, 6).toUpperCase();

                  return (
                    <div className="firstSection" key={quest._id}>
                      <div className="item">
                        <img src={QuestImage} alt="quest" />
                      </div>
                      <div className="item2">Quest #{shortQuestId}</div>
                      <div className="item3">
                        <button
                          type="button"
                          className="btn questBtn"
                          onClick={() => {
                            navigate("/quests/" + quest._id, {
                              state: {
                                quest: quest,
                              },
                            });
                          }}
                        >
                          View Quest
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <p className="text-title">Quest stats</p>
          <div className="secondSection">
            <div className="first">
              <p className="text-title-bold">Incoming Quests</p>
              <p className="text-bold">
                {!questsStats ? "waiting" : questsStats?.incoming}
              </p>
              {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
            </div>
            <div className="second">
              <p className="text-title-bold">Completed Quests</p>
              <p className="text-bold">
                {!questsStats ? "waiting" : questsStats?.completed}
              </p>
              {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
            </div>
            <div className="third">
              <p className="text-title-bold">On-Going Quests</p>
              <p className="text-bold">
                {!questsStats ? "waiting" : questsStats?.onGoing}
              </p>
              {/* <p><span className="text-light-mine">8.3%</span> up from yesterday</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
