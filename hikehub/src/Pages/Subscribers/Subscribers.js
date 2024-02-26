import React, { useState, useEffect } from "react";
import styles from "../Trails/Trails.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/*********************************** */

import axiosInstance from '../../Utils/AxiosInstance';
import ModelAddSubscriber from "./AddSubscriber";

/************************************* */

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [isFormOpen, setIsForm] = useState(false);

    const handleAddFormClose = () => {
        setIsForm(false)
        fetchsubscribers()
    };

    const columns = [
        { field: '_id', headerName: 'ID', flex:1 },
        {
            field: "email", headerName: "Email", flex:1
        },
        {
            field: 'Action',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <div onClick={() => handleDelete(params.row._id)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </div>
                </div>
            ),
        },
    ];


    const handleAdd = (e) => {
        e.preventDefault();
        setIsForm(true)
    };



    /************************************** */
    const fetchsubscribers = async () => {
        try {

            const response = await axiosInstance.get(`subscribe`, { withCredentials: true });
            if (response) {
                setSubscribers(response.data)
            }
        } catch (error) {
            console.log(error.message); 
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`subscribe/${id}`, { withCredentials: true });
            if (response) {
                toast.success("Subscribtion deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                fetchsubscribers()
            }


        } catch (error) {
            console.error("Error deleting subsribtion:", error.message);
        }
    };

    useEffect(() => {
        fetchsubscribers()
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
          Subscribers</h1>
        <button
          className={styles.btnAdd}
          onClick={handleAdd}
        >
          Add Subscriber
        </button>
      </div>
            <DataGrid
                getRowId={(subscribers) => subscribers._id}
                rows={subscribers || []}
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
{isFormOpen&& <ModelAddSubscriber onClose={handleAddFormClose} />}
        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};