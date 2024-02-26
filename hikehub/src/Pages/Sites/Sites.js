import React, { useState, useEffect } from "react";
import styles from "../Trails/Trails.module.css";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/*********************************** */

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axiosInstance from '../../Utils/AxiosInstance';
import SiteForm from './AddSite'
/************************************* */

export default function Sites() {
    const [item, setItem] = useState([]);
    const [sites, setSites] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isUpdateCategoryOpen, setIsUpdateCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isFormOpen, setIsAddFormOpen] = useState(false);
    const [selectedSite, setSelectSite] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    const [type, setType] = useState({
        add: false,
        edit: false,
        delete: false
    })


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



    const handleEdit = (site) => {
        setSelectSite(site)
        setType({
            add: false,
            edit: true,
            delete: false
        })
    }

    const handleAddFormClose = () => {
        // setIsAddCategoryOpen(false);
        // setIsUpdateCategoryOpen(false)
        setType({
            add: false,
            edit: false,
            delete: false
        })
        fetchSites()
    };
    const columns = [
        {
            field: "image",
            headerName: "Image",
            width: 150,
            renderCell: (params) => (
                <img
                    src={`${process.env.REACT_APP_BACKEND_PATH}${params.value}`}
                    alt="Image"
                    style={{ width: 60, height: 60 }}
                />
            ),
        },
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: "name", headerName: "Name", width: 250
        },
        {
            field: "description", headerName: "Description", width: 400,
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
                    </div>)
            }
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
                    <div onClick={() => handleDelete(params.row)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </div>
                </div>
            ),
        },
    ];
    // post data
    const handleAdd = (e) => {
        // setSelectedLocation(location)
        setType({
            add: true,
            edit: false,
            delete: false
        })
    };
    const emptyRow = { id: -1, name: "Loading..." };

    //   const rowsWithEmptyRow = isloading ? [emptyRow] : data;


    /************************************** */
    const fetchSites = async () => {
        try {

            const response = await axiosInstance.get(`site/read`, { withCredentials: true });
            if (response) {
                setSites(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = (site) => {
        setSelectSite(site)
        setType({
            add: false,
            edit: false,
            delete: true
        })
    }
    // const handleDelete = async (id) => {

    //     try {
    //         const response = await axiosInstance.delete(`site/delete/${id}`, { withCredentials: true });
    //         if (response) {
    //             toast.success("Site deleted successfully", {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 toastId: 3,
    //             });

    //             fetchSites()
    //         }


    //     } catch (error) {
    //         console.error("Error deleting item:", error.message);
    //     }
    // };

    useEffect(() => {
        fetchSites()
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

            <div className={styles.actionDiv}>
                <h1 style={{ fontSize: 30, fontWeight: "bold" }}>
                    Sites</h1>
                <button
                    className={styles.btnAdd}
                    onClick={handleAdd}
                >
                    Add Site
                </button>
            </div>

            <DataGrid
                getRowId={(sites) => sites._id}
                rows={sites || []}
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

            {type.add && <SiteForm onClose={handleAddFormClose} type={"Add"} />}
            {type.edit && selectedSite && <SiteForm onClose={handleAddFormClose} site={selectedSite} type={"Edit"} />}
            {type.delete && selectedSite && <SiteForm onClose={handleAddFormClose} site={selectedSite} type={"Delete"} />}

        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};