import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AllCommunityModule,
  type CellClassParams,
  type CellValueChangedEvent,
  type ICellRendererParams,
  type RowSelectionOptions,
  type ValueFormatterParams,
} from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import {
  deleteRequest,
  fetchRequests,
  updateRequest,
} from "../../services/animalsService";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Request.module.scss";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import type { Request } from "../../types/request";
import Modal from "../../components/Modal/Modal";

export default function Requests() {
  const queryClient = useQueryClient();
  const modules = [AllCommunityModule];
  const gridRef = useRef<AgGridReact<Request>>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const { mutate: update } = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Updated successfully");
    },
    onError: () => toast.error("Update failed"),
  });

  const { mutate: deleteReq } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Deleted successfully");
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  const colDefs = [
    {
      field: "createdAt",

      sortable: true,
      valueFormatter: (params: ValueFormatterParams) =>
        new Date(params.value).toLocaleString(),
      comparator: (a: string, b: string) =>
        new Date(a).getTime() - new Date(b).getTime(),
    },
    { field: "customerName", filter: true },
    { field: "phone" },
    {
      field: "status",
      sortable: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["new", "contacted", "closed"],
      },

      filter: true,
      cellStyle: (params: CellClassParams) => {
        if (params.value === "new") {
          return { color: "blue", fontWeight: "bold" };
        }
        if (params.value === "contacted") {
          return { color: "orange", fontWeight: "bold" };
        }
        if (params.value === "closed") {
          return { color: "green", fontWeight: "bold" };
        }
      },
    },
    {
      headerName: "Detailes",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <button
            className={styles.viewDetailsBtn}
            type="button"
            disabled={!params.data.message}
            onClick={() => handleViewDetails(params.data.message)}
          >
            Message
          </button>
        );
      },
    },

    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => {
              deleteReq(params.data._id);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    resizable: false,
  };

  const handleViewDetails = (message?: string) => {
    if (!message) return;

    setSelectedMessage(message);
  };

  const handleValueChange = (params: CellValueChangedEvent) => {
    if (params.colDef.field !== "status") return;
    if (params.oldValue === params.newValue) return;

    const updatedRequestData = {
      _id: params.data._id,
      status: params.newValue,
    };
    update(updatedRequestData);
  };

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };

  const handleBulkContacted = () => {
    if (!gridRef.current) return;
    const selectedRows = gridRef.current.api.getSelectedRows();

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
    }

    selectedRows.forEach((row) => {
      if (row.status === "contacted") return;
      update({
        _id: row._id,
        status: "contacted",
      });
    });
  };

  const handleBulkClosed = () => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.api.getSelectedRows();

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }
    selectedRows.forEach((row) => {
      if (row.status === "closed") return;
      update({
        _id: row._id,
        status: "closed",
      });
    });
  };

  const handleBulkDelete = () => {
    if (!gridRef.current) return;

    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }

    selectedRows.forEach((row) => {
      deleteReq(row._id);
    });
  };

  return (
    <>
      <Section>
        <Container>
          {/* <div style={{ display: "flex" }}> */}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error!</p>}
          <Toaster />
          {data && (
            <AgGridProvider modules={modules}>
              <ul className={styles.btnsList}>
                <li className={styles.btnsItem}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleBulkDelete}
                  >
                    Delete
                  </button>
                </li>
                <li className={styles.btnsItem}>
                  <button onClick={handleBulkContacted}>
                    Mark as Contacted
                  </button>
                </li>
                <li className={styles.btnsItem}>
                  <button onClick={handleBulkClosed}>Mark as Closed</button>
                </li>
              </ul>
              <div className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridReact
                  rowData={data}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  onCellValueChanged={handleValueChange}
                  rowSelection={rowSelection}
                  ref={gridRef}
                />
              </div>
            </AgGridProvider>
          )}
          {/* </div> */}
        </Container>
      </Section>
      {selectedMessage && (
        <Modal onModalClose={() => setSelectedMessage(null)}>
          <h2 className={styles.modalTitle}>Customer message</h2>
          <p className={styles.modalText}>{selectedMessage}</p>
          <button
            className={styles.modalCloseBtn}
            type="button"
            onClick={() => setSelectedMessage(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );
}
