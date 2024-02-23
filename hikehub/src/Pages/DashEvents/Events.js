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
import 'react-toastify/dist/ReactToastify.minimal.css';

/*********************************** */

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axiosInstance from '../../Utils/AxiosInstance';

/************************************* */

export default function EventsTable() {
    const [item, setItem] = useState([]);
    const [events, setEvents] = useState([]);
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
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: "trail", headerName: "Trail", width: 250, renderCell: (params) => (
                params.value.title
            )
        },
        {
            field: "date", headerName: "Date", width: 250, renderCell: (params) => (
                params.value.split('T')[0]
            )
        },
        { field: "cost", headerName: "Cost", width: 100 },
        { field: "status", headerName: "Status", width: 100 },
        { field: "maxSeats", headerName: "Seats", width: 150 },
        {
            field: "meetingPoints", headerName: "Meeting Points", width: 250, renderCell: (params) => (
                <ul>
                    {
                        params.value.map((point) => (
                            <li>{point.meetingPoint + " at " + point.time}</li>
                        ))
                    }
                </ul>
            )
        },
        {
            field: 'Action',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <div onClick={() => handleEdit(params.row)} style={{ cursor: "pointer" }}>
                        <EditIcon />
                    </div>

                    <div onClick={() => handleEdit(params.row)} style={{ cursor: "pointer" }}>
                        <RemoveRedEyeIcon />
                    </div>

                    <div onClick={() => handleDelete(params.row._id)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </div>
                </div>
            ),
        },
    ];



    // post data
    const handleAdd = (e) => {
        e.preventDefault();
        setIsAddCategoryOpen(true)
    };
    const emptyRow = { id: -1, name: "Loading..." };

    //   const rowsWithEmptyRow = isloading ? [emptyRow] : data;


    /************************************** */
    const fetchEvents = async () => {
        try {

            const response = await axiosInstance.get(`event/read`, { withCredentials: true });
            if (response) {
                setEvents(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`event/delete/${id}`, { withCredentials: true });
            if (response) {
                toast.success("Event deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                fetchEvents()
            }


        } catch (error) {
            console.error("Error deleting item:", error.message);
        }
    };


    useEffect(() => {
        fetchEvents()
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
        <h1 style={{ fontSize: 30, fontWeight: "bold"}}>
          Events</h1>
        <button
          className={styles.btnAdd}
          onClick={handleAdd}
        >
          Add Event
        </button>
      </div>
            {/* <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}> Events</h1>
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
                Add Event
            </button> */}
            <DataGrid
                getRowId={(events) => events._id}
                rows={events || []}
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