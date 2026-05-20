import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CardNameAndNumber from "../features/sites/cardNameAndNumber";
import SiteCard from "../features/sites/SiteCard";
import { siteData } from "../utils/Constants";
import AddSiteModalForm from "../components/AddSiteModalForm";
import addIcon from "../asset/add.svg";
import chatIcon from "../asset/chat.svg";
import ChatBox from "../features/chatBox";
import { useNavigate } from "react-router-dom";

import { createSite, getSites, deleteSite } from "../services/siteService";
const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
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
            <div className="flex flex-col items-start pb-1 pl-3 border-b-2 border-l-4 border-gray-800">
              <p className="ml-2 text-3xl font-bold text-gray-800">Dashboard</p>
              <h className="ml-2 font-serif italic text-gray-600">
                Track and manage your construction expenses{" "}
              </h>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-4 right-2 backdrop-blur-sm">
          <div className="relative flex flex-col items-center group ">
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 transition rounded-full bg-gradient-to-r from-green-400 to-green-700 hover:ring-2 hover:ring-green-600 hover:ring-offset-2"
              onClick={() =>
                showChat ? setShowChat(false) : setShowChat(true)
              }
            >
              <img src={chatIcon} alt="Chat" className="w-6 h-6" />
            </button>
            <span className="px-2 py-1 mt-1 text-xs text-white transition bg-gray-600 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Chat
            </span>
          </div>
          <div className="relative flex flex-col items-center group">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-12 h-12 transition rounded-full bg-gradient-to-r from-blue-400 to-blue-700 hover:ring-2 hover:ring-blue-600 hover:ring-offset-2"
            >
              <img src={addIcon} alt="Add" className="w-6 h-6" />
            </button>
            <span className="px-2 py-1 mt-1 text-xs text-white transition bg-gray-600 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Add Site
            </span>
          </div>
        </div>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
        <CardNameAndNumber name="Total Sites" value={totalSites} />
        <CardNameAndNumber name="Total Spend" value={`₹${totalSpend}`} />
      </div>
      <div>
        <div className="mt-4 mb-4 font-bold text-left text-black text-sectionTitle">
          Sites Overview
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
