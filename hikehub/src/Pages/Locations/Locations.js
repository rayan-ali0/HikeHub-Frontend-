import React, { useState, useEffect } from "react";
import styles from "../Trails/Trails.module.css";
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
import ModelAddLocation from './AddLocation.js'
/************************************* */

export default function Locations() {
    const [item, setItem] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isUpdateCategoryOpen, setIsUpdateCategoryOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });

    const [type, setType] = useState({
        add: false,
        edit: false,
        delete: false
    })
    console.log("oennnnnnnnnnnnnnnnnnn", isAddFormOpen)


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



    const handleEdit = (location) => {
        // setIsUpdateCategoryOpen(true)
        // setSelectedCategory(category);
        setSelectedLocation(location)
        setType({
            add: false,
            edit: true,
            delete: false
        })
    }

    const handleAddFormClose = () => {
        setType({
            add: false,
            edit: false,
            delete: false
        })
        fetchLocations()
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 300 },
        {
            field: "name", headerName: "Name", width: 300
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
    const handleAdd = () => {
        // e.();
        console.log("opene Clicked")
        setType({
            add: true,
            edit: false,
            delete: false
        })
        // setIsAddCategoryOpen(true)
    };
    const emptyRow = { id: -1, name: "Loading..." };

    //   const rowsWithEmptyRow = isloading ? [emptyRow] : data;


    /************************************** */
    const fetchLocations = async () => {
        try {

            const response = await axiosInstance.get(`location/read`, { withCredentials: true });
            if (response) {
                setLocations(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = (location) => {
        setSelectedLocation(location)
        setType({
            add: false,
            edit: false,
            delete: true
        })
    }


    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axiosInstance.delete(`location/delete/${id}`, { withCredentials: true });
    //         if (response) {
    //             toast.success("Location deleted successfully", {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 toastId: 3,
    //             });

    //             fetchLocations()
    //         }

    //     } catch (error) {
    //         console.error("Error deleting item:", error.message);
    //     }
    // };


    useEffect(() => {
        fetchLocations()
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
                    Locations</h1>
                <button
                    className={styles.btnAdd}
                    onClick={handleAdd}
                >
                    Add Location
                </button>
            </div>
            <DataGrid
                getRowId={(locations) => locations._id}
                rows={locations || []}
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



            <section>
                {/* {isModelFormOpen && <ModelForm model={selectedModel} onClose={() => setIsModelFormOpen(false)}   />} */}
                {type.add && <ModelAddLocation onClose={handleAddFormClose} isAddFormOpen={isAddFormOpen} type={"Add"}   />}
                {type.edit && selectedLocation && <ModelAddLocation onClose={handleAddFormClose} location={selectedLocation}  isAddFormOpen={isAddFormOpen} type={"Edit"} />}
                {type.delete && selectedLocation && <ModelAddLocation onClose={handleAddFormClose} location={selectedLocation} isAddFormOpen={isAddFormOpen} type={"Delete"} />}

            </section>
        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};