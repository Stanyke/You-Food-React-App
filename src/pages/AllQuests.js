import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/dashboard.css";
import QuestImage from "../assets/images/quest.png";
import ovalDot from "../assets/images/ovalDot.png";
import useApp from "../store/contexts/AppContext";

export default function AllQuests() {
  const {
    appState: { quests },
    getQuestsFromDb,
    getQuestsFromTestData,
  } = useApp();

  const navigate = useNavigate();
  const initialSelectedQuest = useRef(null);

  const [availableQuests, setAvailableQuests] = useState([]);
  const [questsStats, setQuestsStats] = useState(null);
  const [activeTagElement, setActiveTagElement] = useState(null);

  useEffect(() => {
    getQuestsFromTestData();
  }, []);

  useEffect(() => {
    if (Object.values(quests).length) {
      const filteredQuests = filterQuests(quests);

      let broadcastedQuests = filteredQuests[0];

      const completedQuests = filteredQuests[1];

      const onGoingQuests = filteredQuests[2];

      const updatedQuestsStats = {
        incoming: broadcastedQuests.length ? broadcastedQuests.length : 0,
        completed: completedQuests.length ? completedQuests.length : 0,
        onGoing: onGoingQuests.length ? onGoingQuests.length : 0,
      };

      setQuestsStats(updatedQuestsStats);

      setAvailableQuests(broadcastedQuests);
    } else {
      setAvailableQuests([]);
      setQuestsStats(null);
    }
  }, [quests]);

  const filterQuests = (quests, type) => {
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

    return [broadcastedQuests, completedQuests, onGoingQuests];
  };

  const toggleCategories = (e, type) => {
    if (e.nodeName.toLowerCase() !== "img") {
      if (activeTagElement) {
        activeTagElement.className = "";
      }

      if (activeTagElement !== e) {
        const filteredQuests = filterQuests(quests);

        if (initialSelectedQuest.current !== e) {
          initialSelectedQuest.current.className = "";
        }
        e.className = "active";
        setActiveTagElement(e);
        if (type === "incoming") {
          setAvailableQuests(filteredQuests[0]);
        } else if (type === "completed") {
          setAvailableQuests(filteredQuests[1]);
        } else if (type === "on-going") {
          setAvailableQuests(filteredQuests[2]);
        }
      }
    }
  };

  return (
    <div>
      <div className="contentContainer quests">
        <div className="contentHeader quests">
          <div className="title text-dark">Filter Quests</div>
          <div className="listBox">
            <div
              onClick={(e) => toggleCategories(e.target, "incoming")}
              className="active"
              ref={initialSelectedQuest}
            >
              <img src={ovalDot} alt="oval dot" />
              Incoming Quests ({questsStats?.incoming})
            </div>
            <div onClick={(e) => toggleCategories(e.target, "completed")}>
              <img src={ovalDot} alt="oval dot" />
              Completed Quests ({questsStats?.completed})
            </div>
            <div onClick={(e) => toggleCategories(e.target, "on-going")}>
              <img src={ovalDot} alt="oval dot" />
              On-Going Quests ({questsStats?.onGoing})
            </div>
          </div>
        </div>

        <div className="contentBody dashboard">
          <div className="allQuestsContainer">
            {Object.values(availableQuests).length ? (
              <p className="text-title">Quests</p>
            ) : <p className="text-title text-center">Quests Empty</p>}
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
        </div>
      </div>
    </div>
  );
}
