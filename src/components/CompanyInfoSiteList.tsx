import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
    GridSlots,
} from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { CompanyInfoSite } from "../interface/CompanyInfoSite";
import { Alert, Snackbar } from "@mui/material";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = uuidv4();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: "", url: "", isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add url
            </Button>
        </GridToolbarContainer>
    );
}

function CompanyInfoSiteList() {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    useEffect(() => {
        chrome.storage.local.get(["companyInfoSites"]).then((res) => {
            setRows((_) => res.companyInfoSites);
        });
    }, []);

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        chrome.storage.local.set({ companyInfoSites: updatedRows });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: CompanyInfoSite) => {
        if (validateRowData(newRow)) {
            const updatedRow = { ...newRow };
            const updatedRows = rows.map((row) =>
                row.id === newRow.id ? updatedRow : row
            );
            setRows(updatedRows);
            chrome.storage.local.set({ companyInfoSites: updatedRows });
            return updatedRow;
        } else {
            throw { rowId: newRow.id };
        }
    };

    const onProcessRowUpdateError = (error) => {
        setOpenSnackBar(true);
        setRowModesModel({
            ...rowModesModel,
            [error.rowId]: { mode: GridRowModes.Edit },
        });
    };

    const validateRowData = (row: CompanyInfoSite): boolean => {
        if (row.name.trim().length === 0 || row.url.trim().length === 0) {
            return false;
        }
        if (!(/{}+/.test(row.url))) {
            return false;
        }
        return true;
    };

    const handleSnackBarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            editable: true,
            disableColumnMenu: true,
            disableReorder: true,
            flex: 1,
            sortable: false,
        },
        {
            field: "url",
            headerName: "URL",
            minWidth: 100,
            editable: true,
            disableColumnMenu: true,
            disableReorder: true,
            flex: 1,
            sortable: false,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            minWidth: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={onProcessRowUpdateError}
                slots={{
                    toolbar: EditToolbar as GridSlots["toolbar"],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                autoHeight={true}
            />
            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackBarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {"Name 和 URL 不能為空，且必須包含{}。"}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CompanyInfoSiteList;
