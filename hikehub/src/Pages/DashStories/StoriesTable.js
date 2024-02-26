import React, { useState, useEffect } from "react";
// import styles from "./StoriesTable.module.css";
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
import { display } from "@mui/system";
import StoryForm from "./StoriesForm";

/************************************* */

export default function StoriesTable() {
    const [item, setItem] = useState([]);
    const [stories, setStories] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isUpdateCategoryOpen, setIsUpdateCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState({
        add:false,
        edit:false,
        delete:false
    });
    const [selectedStory, setSelectedStory] = useState([]);


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });




    const handleEdit = (category) => {
        setIsUpdateCategoryOpen(true)
        setSelectedCategory(category);
    }

    const handleAddFormClose = () => {
        setIsAddCategoryOpen(false);
        setIsUpdateCategoryOpen(false)
    };
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
            field: "title", headerName: "Tilte", width: 250
        },
        // {
        //     field: "eventId", headerName: "Date", width: 250, renderCell: (params) => (
        //         params.value.date.split('T')[0]
        //     )
        // },
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
            field: "images",
            headerName: "Image",
            width: 300,
            renderCell: (params) => (
                <div style={{display:"flex",gap:"5px"}}>
                    {
                        params.value.map((img) => (
                            <img
                                src={`${process.env.REACT_APP_BACKEND_PATH}${img}`}
                                alt="Image"
                                style={{ width: 60, height: 60 }}
                            />
                        ))
                    }
                </div>


            ),
        },
        {
            field: 'Action',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <div onClick={()=>handleOpen("Edit",params.row)} style={{ cursor: "pointer" }}>
                        <EditIcon />
                    </div>
                    <div onClick={()=>handleOpen("Delete",params.row)} style={{ cursor: "pointer" }}>
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


    const handleOpen=(action,data)=>{
        setSelectedStory(data)
        if(action==="Add"){
            setIsFormOpen({add:true,edit:false,delete:false})
        }
        else if(action==="Edit"){
            setIsFormOpen({add:false,edit:true,delete:false})
        }
        else{
            setIsFormOpen({add:false,edit:false,delete:true})
    
        }
    
    }

    /************************************** */
    const fetchstories = async () => {
        try {
            const response = await axiosInstance.get(`story/read`, { withCredentials: true });
            if (response) {
                setStories(response.data)
                console.log("datee",response.data[0].eventId.date)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`story/delete/${id}`, { withCredentials: true });
            if (response) {
                toast.success("Story deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                fetchstories()
            }


        } catch (error) {
            console.error("Error deleting item:", error.message);
        }
    };

    const handleClose=()=>{
        setIsFormOpen({add:false,edit:false,delete:false})
        setSelectedStory()
        fetchstories()
    }

    useEffect(() => {
        fetchstories()
    }, []);
    /***********************************/
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
          Stories</h1>
        <button
          className={styles.btnAdd}
          onClick={()=>handleOpen("Add")}
        >
          Add Story
        </button>
      </div>
            <DataGrid
                getRowId={(stories) => stories._id}
                rows={stories || []}
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

{
    isFormOpen.add &&<StoryForm onClose={handleClose} type={"Add"}/>
}
{
    isFormOpen.edit && selectedStory &&<StoryForm onClose={handleClose}  story={selectedStory} type={"Edit"}/>
}
{
    isFormOpen.delete && selectedStory &&<StoryForm onClose={handleClose}  story={selectedStory} type={"Delete"}/>
}
        </div>
    );
}

const CustomToolbar = () => {
    return (
        <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
};