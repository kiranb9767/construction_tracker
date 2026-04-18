import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { siteList } from "../utils/Constants";
import CardNameAndNumber from "../features/sites/cardNameAndNumber";
import ProgressBar from "../components/ProgressBar";
import Tabber from "../components/Tabber";
import ItemList from "../features/sites/ItemList";
import AddItemModelForm from "../components/AddItemModelForm";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

import BarChartComponent from "../components/BarChart";
import { getSiteById } from "../services/siteService";
import {
  addMaterial,
  addLabour,
  updateLabour,
  updateMaterial,
  deleteLabour,
  deleteMaterial,
} from "../services/expenseService";

const SiteDetailsPage = () => {
  const { siteId } = useParams();
  console.log("Site ID from URL:", siteId);
  const [curSiteDetail, setCurSiteDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("materials");

  const [materialList, setMaterialList] = useState([]);
  const [labourList, setLabourList] = useState([]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);


  const handleAddItem = (newItem) => {
    console.log("Adding new item:", newItem);
    if (activeTab === "materials") {
      addMaterial(siteId, newItem)
        .then((response) => {
          console.log("Material added successfully:", response.site.Materials );
          setMaterialList((prevList) => [...prevList, ...response.site.Materials ]);
          setShowAddForm(false);
        })
        .catch((error) => {
          console.error("Error adding material:", error);
        });
    } else {
      addLabour(siteId, newItem)
        .then((response) => {
          console.log("Labour added successfully:", response);
          setLabourList((prevList) => [...prevList, ...response.site.Labours]);
          setShowAddForm(false);
        })
        .catch((error) => {
          console.error("Error adding labour:", error);
        });
    }
  };

  const handleEditItem = (updatedItem) => {};

  const handleDeleteItem = () => {
    console.log("Deleting item:", deleteItem);
    if (activeTab === "materials") {
      deleteMaterial(siteId, deleteItem.itemId)
        .then((response) => {
          console.log("Material deleted successfully:", response);
          setMaterialList((prevList) =>
            prevList.filter((item) => item.id !== deleteItem.itemId)
          );
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting material:", error);
        });
    } else {
      deleteLabour(siteId, deleteItem.itemId)
        .then((response) => {
          console.log("Labour deleted successfully:", response);
          setLabourList((prevList) =>
            prevList.filter((item) => item.id !== deleteItem.itemId)
          );
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting labour:", error);
        });
    }
    fetchSiteDetails();
  }


  const currentList = activeTab === "materials" ? materialList : labourList;

  const fetchSiteDetails = async () => {
    try {
      console.log("Fetching details for site ID:", siteId);
      console.log("type of siteId:", typeof siteId);
      const data = await getSiteById(siteId);
      console.log("API response for site details:", data);
      const site = data.site;
      console.log("Site details fetched:", site.Materials);
      setCurSiteDetail(site);
      setLabourList(site.Labours);
      setMaterialList(site.Materials);
    } catch (error) {
      console.error("Error fetching site details:", error);
    }
  };

  // const PERCENTAGE = budget === 0 ? 0 : Math.round((spent / budget) * 100);
  useEffect(() => {
    fetchSiteDetails();
  }, [siteId]);

  const onEdit = (itemType, itemId) => {
    console.log("Edit", itemType, itemId);
    setShowEditForm(true);
  };

  const onDelete = (itemType, itemId) => {
    console.log("Delete", itemType, itemId);
    
    setDeleteItem({ itemType, itemId });
    setShowDeleteModal(true);
  };

  const addItem = (itemType) => {
    console.log("Add new", itemType);
    setShowAddForm(true);
  };

  const getExpenseChartData = (itemList) => {
    const map = {};
    console.log("Generating chart data for:", itemList);
    if (activeTab === "materials") {
      itemList.forEach((item) => {
        const total = item.quantity * item.price;

        if (map[item.name]) {
          map[item.name] += total;
        } else {
          map[item.name] = total;
        }
      });
    } else {
      itemList.forEach((item) => {
        if (map[item.name]) {
          map[item.name] += item.salary;
        } else {
          map[item.name] = item.salary;
        }
      });
    }
    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  };

  return (
    <Layout>
      <div className="">
        <div className="text-sectionTitle font-bold text-black mb-4 text-left">
          Site Expense Details
        </div>
        <div className="flex flex-row  items-center gap-2 mb-10">
          <Link to={"/"}>
            <div className="text-blue-500 font-semiBold text-small">Back</div>
          </Link>
          <div className="">|</div>
          <div className="text-sectionTitle font-bold text-black text-left">
            {curSiteDetail && curSiteDetail.name}
          </div>
        </div>

        {curSiteDetail && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-2: xs:grid-cols-1 gap-4">
              <CardNameAndNumber name="Budget" value={curSiteDetail.budget} />
              <CardNameAndNumber name="Spent" value={curSiteDetail.spent} />
              <CardNameAndNumber
                name="Remaining"
                value={curSiteDetail.budget - curSiteDetail.spent}
              />
            </div>

            <div className="mt-4">
              <ProgressBar
                percentage={
                  curSiteDetail.budget === 0
                    ? 0
                    : Math.round(
                        (curSiteDetail.spent / curSiteDetail.budget) * 100,
                      )
                }
              />

              <div className="">
                {curSiteDetail.budget === 0
                  ? 0
                  : Math.round(
                      (curSiteDetail.spent / curSiteDetail.budget) * 100,
                    )}{" "}
                % Spent
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Tabber
          tabs={[
            { label: "Materials", value: "materials" },
            { label: "Labour", value: "labour" },
          ]}
          activeTab={activeTab}
          onChange={(value) => setActiveTab(value)}
        />

        <div className="font-medium mt-4 text-left max-w-100 flex gap-8 border-b border-gray-500 mb-4">
          {activeTab.toUpperCase()} Expense Analytics
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 border-t pt-6">
        <ItemList
          items={currentList}
          onEdit={onEdit}
          onDelete={onDelete}
          addItem={addItem}
          itemType={activeTab}
        />
        <BarChartComponent data={getExpenseChartData(currentList)} />
      </div>

      {showAddForm && (
        <AddItemModelForm
          itemType={activeTab}
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddItem}
        />
      )}

      {showEditForm && (
        <AddItemModelForm
          itemType={activeTab}
          onClose={() => setShowEditForm(false)}
          onAdd={handleEditItem}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmDialog
          itemType={activeTab}
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteItem}
        />
      )}
    </Layout>
  );
};

export default SiteDetailsPage;
