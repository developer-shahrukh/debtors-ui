import { BlurCircular, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import AlertMessage from "./AlertMessage";
import ItemAddForm from "./ItemAddForm";

const myStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      flexGrow: 1,
    },
    content: {
      padding: "10px",
      textAlign: "center",
      color: "gray",
    },
    mainHeading: {
      fontSize: "24pt",
      fontWeight: "bold",
    },
    itemAddForm: {
      float: "right",
    },
    tableData: {
      "&:hover": {
        color: "white",
        background: "orange",
        cursor: "pointer",
      },
      "&:active": {
        color: "white",
        background: "green",
      },
      cusrsor: "pointer",
    },
    detailsPanel: {
      display: "flex",
      height: "185px",
      margin: "50px",
      marginTop: "5px",
    },
    detailsContentLeft: {
      padding: "10px",
      fontWeight: "600",
      dispaly: "flex",
      height: "155px",
      width: "50%",
      margin: "5px",
    },
    itemHeading: {
      padding: "10px",
      fontSize: "22pt",
      fontWeight: "bold",
      color: "#3461a3",
    },
    detailsContentRight: {
      padding: "10px",
      fontWeight: "600",
      dispaly: "flex",
      height: "155px",
      width: "50%",
      margin: "5px",
      textAlign: "center",
    },
    uom: {
      height: "165px",
      width: "100%",
      textAlign: "center",
      overflow: "auto",
    },
    uomHeading: {
      color: "#3461a3",
      padding: "2px",
      fontSize: "18pt",
      fontWeight: "bold",
      marginTop: "10px",
    },
  };
});

const getItems = () => {
  var promise = new Promise((resolve, reject) => {
    fetch("/getItems")
      .then((response) => {
        if (!response.ok)
          throw Error("Unable to fetch data,try after some time");
        return response.json();
      })
      .then((items) => {
        resolve(items);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const getUoms = () => {
  var promise = new Promise((resolve, reject) => {
    fetch("/getUoms")
      .then((response) => {
        if (!response.ok)
          throw Error("Unable to fetch data,try after some time");
        return response.json();
      })
      .then((uoms) => {
        resolve(uoms);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const getByCode = (code) => {
  var promise = new Promise((resolve, reject) => {
    fetch(`/getItem?code=${code}`)
      .then((response) => {
        if (!response.ok)
          throw Error("Unable to fetch data,try after some time");
        return response.json();
      })
      .then((item) => {
        resolve(item);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const editItem = (ev) => {
  alert(ev.currentTarget.id);
};

function Items() {
  const [items, setItems] = React.useState([]);
  const [uoms, setUoms] = React.useState([]);
  const [iUoms, setIuoms] = React.useState([]);
  const [showProgress, setShowProgress] = React.useState(true);
  const [selectedItemCode, setSelectedItemCode] = React.useState(0);

  const [message, setMessage] = React.useState("");
  const [openState, setOpenState] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);
  const [pageNumber, setPageNumber] = React.useState(1);

  const styleClasses = myStyles();

  React.useEffect(() => {
    getItems().then((items) => {
      setItems(items);
      setShowProgress(false);
    });
    getUoms().then((uoms) => {
      setUoms(uoms);
    });
  }, []);

  const openAlert = () => {
    setOpenState(true);
    setTimeout(() => {}, 0);
  };
  const closeAlert = () => {
    setOpenState(false);
  };

  const deleteItem = (ev) => {
    var code = ev.currentTarget.id;
    fetch(`deleteItemByCode?code=${code}`)
      .then((response) => {
        if (response.ok) {
          setItems(items.filter((item) => item.code != code));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; // delete function ends here

  const onPageSizeChanged = (ev) => {
    setPageSize(ev.target.value);
    setPageNumber(1);
  };

  const onPageChanged = (ev, pg) => {
    setPageNumber(pg + 1);
  };

  const ItemSelected = (ev) => {
    console.log(`Selected item with code : ${ev.currentTarget.id}`);
    setSelectedItemCode(ev.currentTarget.id);
  };

  const UpdateItemTable = () => {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box>
          <Card style={{ float: "right" }}>
            <ItemAddForm
              items={items}
              setItems={setItems}
              uoms={uoms}
              openState={openState}
              setOpenState={setOpenState}
              message={message}
              setMessage={setMessage}
              alertType={alertType}
              setAlertType={setAlertType}
              openAlert={openAlert}
              closeAlert={closeAlert}
              AlertMessage={AlertMessage}
            />
          </Card>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Typography variant="h4" sx={{ color: "skyblue" }}>
              Item Details
            </Typography>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: "60" }} align="left">
                    S.No.
                  </TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>HSN Code</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.length == 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "26pt",
                        background: "#e0d2ab",
                        borderRadius: "40px",
                      }}
                    >
                      Oops! No Record Found
                    </TableCell>
                  </TableRow>
                ) : (
                  items
                    .slice(
                      (pageNumber - 1) * pageSize,
                      (pageNumber - 1) * pageSize + pageSize
                    )
                    .map((item, idx) => {
                      return (
                        <TableRow
                          sx={{
                            cursor: "pointer",
                            "&:hover": { color: "white", background: "orange" },
                          }}
                          onClick={ItemSelected}
                          id={item.code}
                          key={item.code || idx}
                        >
                          <TableCell align="right">
                            {(pageNumber - 1) * pageSize + (idx + 1)}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.hsnCode}</TableCell>
                          <TableCell>
                            <Edit
                              style={{ cursor: "pointer" }}
                              id={item.code}
                              onClick={editItem}
                            />
                          </TableCell>
                          <TableCell>
                            <Delete
                              style={{ cursor: "pointer" }}
                              id={item.code}
                              onClick={deleteItem}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            count={items.length}
            rowsPerPage={pageSize}
            page={pageNumber - 1}
            onPageChange={onPageChanged}
            onRowsPerPageChange={onPageSizeChanged}
          />
          {showProgress && <CircularProgress />}
          {selectedItemCode != 0 && (
            <ItemDetails selectedItemCode={selectedItemCode} items={items} />
          )}
        </Box>
      </Paper>
    );
  };

  const ItemDetails = ({ selectedItemCode, items }) => {
    
    getByCode(selectedItemCode).then((i) => {
      //console.log(i);
      //console.log(i.length);
      const uomCodes = i.map((item) => item.unitOfMeasurements);
      const matchedUoms = uomCodes.map((code) =>
        uoms.find((u) => u.code === code)
      );
      //console.log(matchedUoms);
      setIuoms(matchedUoms);
    });
    const item = items.find((i) => i.code == selectedItemCode);
    const styleClasses = myStyles();
    return !item || !item.name ? null : (
      <Paper className={styleClasses.detailsPanel}>
        <Card className={styleClasses.detailsContentLeft}>
          <span className={styleClasses.itemHeading}>Item Details</span>
          <br />
          <span className={styleClasses.detailsContent}>
            Item Name : {item.name}
          </span>
          <br />
          <span className={styleClasses.detailsContent}>
            HSN Code : {item.hsnCode}
          </span>
          <br />
          <span className={styleClasses.detailsContent}>
            CGST : {item.cgst}
          </span>
          <br />
          <span className={styleClasses.detailsContent}>
            SGST : {item.sgst}
          </span>
          <br />
          <span className={styleClasses.detailsContent}>
            IGST : {item.igst}
          </span>
          <br />
        </Card>
        <Box className={styleClasses.detailsContentRight}>
          <Card className={styleClasses.uom}>
            <span className={styleClasses.uomHeading}>
              Unit of Measurements
            </span>
            {
              <ul style={{listStyleType:"none"}}>
                {!iUoms || iUoms.length === 0 ? (
                  <li>No Uom available in this item</li>
                ) : (
                  iUoms.map((u, index) => (
                    <li list-style-type="none" key={u.code || index}>{u.name}</li>
                )) 
                )}
              </ul>
            }
            <br />
          </Card>
        </Box>
        <AlertMessage
          openState={openState}
          duration={3000}
          horizontalAlignment="center"
          verticalAlignment="bottom"
          onClose={closeAlert}
          alertType={alertType}
          message={message}
        />
      </Paper>
    );
  };

  return <UpdateItemTable />;
}
export default Items;
