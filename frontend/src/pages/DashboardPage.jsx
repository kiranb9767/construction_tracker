import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CardNameAndNumber from "../features/sites/cardNameAndNumber";
import SiteCard from "../features/sites/SiteCard";
import { siteData } from "../utils/Constants";
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

  const totalSites = siteListData.length;

  const totalSpend = siteListData.reduce(
    (sum, site) => sum + (site.spent || 0),
    0,
  );

  console.log("Total Spend:", totalSpend);
  console.log("Total Sites:", totalSites);

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
      console.log("Updated site list:", siteListData);
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-row">
            <div className="flex flex-col items-start pl-3 pb-1 border-l-4 border-b-2 border-purple-500">
              <p className="text-3xl font-bold text-gray-800 ml-2">Dashboard</p>
              <h className="text-gray-600 font-serif italic ml-2">
                Track and manage your construction expenses{" "}
              </h>
            </div>
          </div>
        </div>

        <div className="right-6 flex gap-10 z-50">
          <div className="group relative flex flex-col items-center">
            <button
              type="button"
              className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full flex items-center justify-center"
              onClick={() =>
                showChat ? setShowChat(false) : setShowChat(true)
              }
            >
              <img src={chatIcon} alt="Chat" className="w-6 h-6" />
            </button>
            <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Chat
            </span>
          </div>
          <div className="group relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full flex items-center justify-center"
            >
              <img src={addIcon} alt="Add" className="w-6 h-6" />
            </button>
            <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Add Site
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl">
        <CardNameAndNumber name="Total Sites" value={totalSites} />
        <CardNameAndNumber name="Total Spend" value={`₹${totalSpend}`} />
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
