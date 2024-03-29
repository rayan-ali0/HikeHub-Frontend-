import React, { useState, useEffect } from "react";
// import styles from "./Users.module.css";
import styles from "../Trails/Trails.module.css";

import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.minimal.css';

// import CategoryAdd from "./CategoryAdd";
//  import UpdateCategory from "./CategoryUpdate";

/*********************************** */

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axiosInstance from '../../Utils/AxiosInstance';
import ModelEditUser from "./EditUser";
import AddUser from "./AddUser";

/************************************* */

export default function Users() {
    const [item, setItem] = useState([]);
    const [users, setUsers] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const [selectedUser, setSelectedUser] = useState()

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



    const handleEdit = (user) => {
        setSelectedUser(user)
        setIsEditOpen(true)
    }

    const handleEditClose=()=>{
        setIsEditOpen(false)
        setSelectedUser()
        fetchUsers()
    }

    const columns = [
        // {
        //     field: "image",
        //     headerName: "Image",
        //     width:150 ,
        //     renderCell: (params) => (
        //       <img
        //       src={`${process.env.REACT_APP_BACKEND_PATH}${params.value}`}
        //       alt="Image"
        //         style={{ width: 60, height: 60 }}
        //       />
        //     ),
        //   },
        { field: '_id', headerName: 'ID', width: 300 },
        {
            field: "name", headerName: "Name", width: 250
        },
        {
            field: "email", headerName: "Email", width: 250
        },
        {
            field: "role", headerName: "Role", width: 150
        },
        {
            field: "phone", headerName: "Phone", width: 300
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
                    <div onClick={() => handleDelete(params.row._id)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </div>
                </div>
            ),
        },
    ];



    const handleAdd = () => {
        setIsAddOpen(true)
    };
    const handleAddClose=()=>{
        setIsAddOpen(false)
        fetchUsers()


    }
    

    /************************************** */
    const fetchUsers = async () => {
        try {

            const response = await axiosInstance.get(`user/all`, { withCredentials: true });
            if (response) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`user/${id}`, { withCredentials: true });
            if (response) {
                toast.success("user deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                fetchUsers()
            }


        } catch (error) {
            console.error("Error deleting item:", error.message);
        }
    };


    useEffect(() => {
        fetchUsers()
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
                    Users</h1>
                <button
                    className={styles.btnAdd}
                    onClick={handleAdd}
                >
                    Add User
                </button>
            </div>
            <DataGrid
                getRowId={(users) => users._id}
                rows={users || []}
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

{isEditOpen&& selectedUser&&(
    <ModelEditUser onClose={handleEditClose} userData={selectedUser}/>
)}
{isAddOpen&& (
    <AddUser onClose={handleAddClose}/>
)}


        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};