import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import CardNameAndNumber from "../features/sites/cardNameAndNumber";
import SiteCard from "../features/sites/SiteCard";
import { siteData} from "../utils/Constants";
import AddSiteModalForm from "../components/AddSiteModalForm";
import addIcon from "../asset/add.svg";
import chatIcon from "../asset/chat.svg";
import ChatBox from "../features/chatBox";

import { createSite, getSites, deleteSite } from "../services/siteService";
const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [siteListData, setSiteListData] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);


  const fetchSites = async () => {
      try {
        const data = await getSites();
        console.log("Fetched sites:", data.sites);
        setSiteListData(data.sites);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

  const handleAddSite = async (newSite) => {
    try {
      console.log("Sending data:", newSite);
      const createdSite = await createSite(newSite);
      console.log("Response from backend:", createdSite.site);
      setSiteListData((prevList) => [...prevList, createdSite.site]);
      console.log("Updated site list:",siteListData);
    } catch (error) {
      console.error("Error adding site:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting site with ID:", id);
      await deleteSite(id);
      console.log("Site deleted successfully");
      setSiteListData((prev) => prev.filter((site) => site._id !== id));
    } catch (error) {
      console.error("Error deleting site:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <div className="text-sectionTitle font-bold text-black mb-4 text-left">
          Dashboard
        </div>
        <div className="top-20 right-6 flex gap-4 z-50">
          <div className="group relative flex flex-col items-center">
            <button
              type="button"
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition"
              onClick={()=> showChat? setShowChat(false): setShowChat(true)}
            >
              <img src={chatIcon} alt="Chat" className="w-6 h-6" />
            </button>
            <span className=" text-xs text-black rounded opacity-0 group-hover:opacity-100 transition">
              Chat
            </span>
          </div>
          <div className="group relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition"
            >
              <img src={addIcon} alt="Add" className="w-6 h-6" />
            </button>
            <span className=" text-xs text-black rounded opacity-0 group-hover:opacity-100 transition">
              Add Site
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl">
        {siteData.map((data) => {
          return (
            <CardNameAndNumber
              key={data.id}
              name={data.name}
              value={data.value}
            />
          );
        })}
      </div>
      <div>
        <div className="text-sectionTitle font-bold text-black mb-4 mt-4 text-left">
          Sites Overview
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {siteListData.map((site) => {
            return (
              <SiteCard key={site._id} {...site} handleDelete={handleDelete} />
            );
          })}
        </div>
      </div>

      {showModal && (
        <AddSiteModalForm
          onClose={() => setShowModal(false)}
          onAdd={handleAddSite}
        />
      )}
      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
    </Layout>
  );
};

export default DashboardPage;
