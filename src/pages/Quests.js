import React, { useEffect } from 'react';
import '../assets/styles/quests.css';
import BoxItem from '../components/BoxItem';
import useApp from "../store/contexts/AppContext";
import itemIcon from '../assets/images/itemIcon.png';
import { useNavigate } from "react-router-dom";

export default function Quests() {
  const {
    appState: { quests },
    getQuestsFromDb
  } = useApp();

  const navigate = useNavigate();

  useEffect(() => {
    getQuestsFromDb();
  }, [])

  return (
    <div>
      <div className="contentContainer quests">
        <div className="contentHeader quests">
          <p className="title">Ongoing Quest</p>
          <p className="text-small">Proceed to packing orders</p>
        </div>

        <div className="contentBody quests">
          {Object.values(quests).length ?
            Object.values(quests).map((quest) => {
              return (
                <div onClick={() => {
                  navigate(
                    "/quests/" + quest._id,
                    {
                      state: {
                        quest: quest
                      }
                    }
                  )
                }}><BoxItem id={quest._id} icon={itemIcon} section1={quest.timeAccepted} status={quest.status}
                  /></div>)
            })
            : null
          }
        </div>

        <div className="contentFooter quests">
          <button type="button" className="btn greenBtn">Start Quest</button>
        </div>
      </div>
    </div>
  );
}
