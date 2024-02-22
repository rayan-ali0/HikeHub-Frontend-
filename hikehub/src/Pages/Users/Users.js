import React, { useState, useEffect } from "react";
import styles from "./Restaurants.module.css";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import CategoryAdd from "./CategoryAdd";
//  import UpdateCategory from "./CategoryUpdate";

/*********************************** */

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axiosInstance from '../../Utils/AxiosInstance';

/************************************* */

export default function Restaurants() {
    const [item, setItem] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isUpdateCategoryOpen, setIsUpdateCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });



    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(
                `${process.env.REACT_APP_PATH}regime/add`,
                formDataToSend
            );

            setItem((prevItems) => [...prevItems, response.data.data]);


            setFormData({
                title: "",
                description: "",
            });
            toast.success("Regime plan added successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });



        } catch (error) {
            console.log(error.message);
        }
    };



    const handleEdit = (category) => {
        setIsUpdateCategoryOpen(true)
        setSelectedCategory(category);
    }

    const handleAddFormClose = () => {
        setIsAddCategoryOpen(false);
        setIsUpdateCategoryOpen(false)
    };
    const columns = [
        {
            field: "image",
            headerName: "Image",
            width:150 ,
            renderCell: (params) => (
              <img
              src={`${process.env.REACT_APP_BACKEND_PATH}${params.value}`}
              alt="Image"
                style={{ width: 60, height: 60 }}
              />
            ),
          },
        { field: '_id', headerName: 'ID', width: 300 },
        {
            field: "name", headerName: "Name", width: 300
        },
        {
            field: "description", headerName: "Description", width: 350,
            renderCell: (params) => {

                return (
                  <div style={{
                    maxHeight: '100%',
                    overflow: 'scroll',
                    WebkitOverflowScrolling: 'touch',
        
                  }}>
                    <style>
                      {`
                            ::-webkit-scrollbar {
                              width: 1px;
                            }
              
                            ::-webkit-scrollbar-thumb {
                              background-color: transparent;
                            }
              
                            ::-webkit-scrollbar-track {
                              background-color: transparent;
                            }
                          `}
                    </style>
                    {params.value}
                  </div>)}
        },
  
        {
            field: 'Action',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <div onClick={() => handleEdit(params.row)} style={{ cursor: "pointer" }}>
                        <EditIcon />
                    </div>
                    <div onClick={() => handleDeletee(params.row._id)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </div>
                </div>
            ),
        },
    ];

    const handleDeletee = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/category/deleteCategory/${id}`,
            );

            toast.success("category plan deleted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

        } catch (error) {
            console.error("Error deleting item:", error.message);
        }
    };


    // post data
    const handleAdd = (e) => {
        e.preventDefault();
        setIsAddCategoryOpen(true)
    };
    const emptyRow = { id: -1, name: "Loading..." };

    //   const rowsWithEmptyRow = isloading ? [emptyRow] : data;


    /************************************** */
    const fetchrestaurants = async () => {
        try {

            const response = await axiosInstance.get(`restaurant/read`, { withCredentials: true });
            if (response) {
                setRestaurants(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchrestaurants()
    }, []);
    /******************************* */
    return (
        <div
            style={{
                width: "90%",
                float: "left",
                margin: "auto",
                height: "650px",
                marginBottom: "7rem",
            }} >

            <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}> restaurants</h1>
            <button
                className={styles.btnAdd}
                style={{
                    color: "white",
                    marginBottom: "1rem",
                    cursor: "pointer",
                    width: "7rem",
                    height: "2.5rem",
                    backgroundColor: "#C62507",
                    borderRadius: "5px",
                    fontWeight: "bold",
                }}
                onClick={handleAdd}
            >
                Add restaurants
            </button>
            <DataGrid
                getRowId={(restaurants) => restaurants._id}
                rows={restaurants || []}
                columns={columns}
                pagination
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                components={{
                    Toolbar: CustomToolbar,
                }}
                sx={{
                    color: "white",
                    // border:"none",
                    paddingTop: "1rem",
                    border: "1px solid white",
                    padding: "20px",
                    borderRadius: "10px",
                    height: "90%",
                    //   borderRadius: "17px",
                    // margin:"10rem",
                    "& .MuiDataGrid-root": {
                        backgroundColor: "white",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        // Background color of column headers
                        color: "white",
                        fontFamily: "Outfit",
                        fontSize: "20px",
                        fontWeight: 'bold', // Make the text bold

                        // Text color of column headers
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #ccc", // Border between cells
                        color: "white",
                        fontSize: "17px",
                        // Text color of cells
                    },
                    "& .MuiTablePagination-root": {
                        color: "white", // Text color of pagination
                    },
                    "& .MuiDataGrid-toolbar": {
                        color: "white",
                        backgroundColor: "white", // Background color of the toolbar
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        // color: 'blue',
                    },
                    "& .MuiButtonBase-root": {
                        color: "white", // Text color for buttons in the toolbar
                    },
                    "& .MuiPaginationItem-icon": {
                        color: "white", // Color of pagination icons
                    },
                    "& .MuiSvgIcon-root": {
                        color: "white",
                    },
                    "& .MuiDataGrid-row , & .MuiDataGrid-cell": {
                        maxHeight: "80px !important",
                        height: "80px !important",
                    },
                }}
            />

            {/* {isAddCategoryOpen && (
        <CategoryAdd
        onClose={handleAddFormClose}
              />
      )}
      {isUpdateCategoryOpen && (
        < UpdateCategory
        onClose={() => setIsUpdateCategoryOpen(false)}
        category={selectedCategory}
        data={data}

        />
      )}
     */}
            <ToastContainer />
        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};