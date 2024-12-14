import {
  AccountBalance,
  AccountCircle,
  Add,
  Call,
  Delete,
  Home,
  Place,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AlertMessage from "./AlertMessage";
import { makeStyles } from "@mui/styles";

const getTraders = async () => {
  try {
    const response = await fetch("/getTrader");
    if (!response.ok) {
      throw new Error("Unable to fetch data, try after some time");
    }
    const traders = await response.json();
    return traders;
  } catch (error) {
    console.error("Error fetching traders : " + error);
    throw error;
  }
};
const getStates = () => {
  var promise = new Promise((resolve, reject) => {
    fetch("/getStates")
      .then((response) => {
        if (!response.ok)
          throw Error("Unable to fetch data,try after some time");
        return response.json();
      })
      .then((states) => {
        resolve(states);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const getCustomers = () => {
  var promise = new Promise((resolve, reject) => {
    fetch("/getCustomers")
      .then((response) => {
        if (!response.ok)
          throw Error("Unable to fetch data,try after some time");
        return response.json();
      })
      .then((customers) => {
        resolve(customers);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

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
const getItemByCode = async (code) => {
  try {
    const response = await fetch(`/getItem?code=${code}`);
    if (!response.ok) {
      console.log(response.status, response.statusText);
      throw Error("Unable to fetch data,try after some time");
    }
    const item = await response.json();
    return item;
  } catch (error) {
    throw error;
  }
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

const myStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      height: "380px",
      margin: "10px",
      overflow: "auto",
    },
    headingsContent: {
      display: "flex",
      justifyContent: "space-between",
    },
    heading: {
      fontSize: "24pt",
      fontWeight: "bold",
      color: "inherit",
      margin: "10px",
      textAlign: "center",
    },
    button: {
      float: "right",
      padding: "10px",
      margin: "10px",
    },
    innerContainer: {
      height: "230px",
      margin: "10px",
    },
    rightSideContainer: {
      height: "230px",
      marginLeft: "50%",
      margin: "10px",
    },
    leftSideContainer: {
      height: "230px",
      marginRight: "50%",
      margin: "10px",
    },
    input: {
      gap: "10px",
      margin: "10px",
    },
    invoice: {
      margin: "20px",
      padding: "10px",
      color: "white",
      background: "#2d4745",
      textAlign: "center",
      borderRadius: "20px",
    },
    selectCustomerLabel: {
      fontWeight: "500",
      fontSize: "14pt",
      float: "right",
      margin: "5px",
    },
    customerDetails: {
      marginLeft: "30px",
      padding: "5px",
    },
    data: {
      fontWeight: "600",
      fontSize: "12pt",
      gap: "10px",
      margin: "0.5em 0",
      textAlign: "left",
    },
    icons: {
      marginTop: "10px",
    },
  };
});

const Invoices = () => {
  const [itemDialogState, setItemDialogState] = React.useState(false);

  const [traders, setTraders] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [uoms, setUoms] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [openState, setOpenState] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");

  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [isSameState, setIsSameState] = React.useState(true);
  const [rate, setRate] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const [totalAmount, setTotalAmount] = React.useState(0);
  const [totalTax, setTotalTax] = React.useState(0);
  const [totalAmountWithTax, setTotalAmountWithTax] = React.useState(0);

  const [traderState, setTraderState] = React.useState("");
  const [customerState, setCustomerState] = React.useState("");

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedUoms, setSelectedUoms] = React.useState([]);
  const [areAllSelected, setAreAllSelected] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const [itemForTable, setItemForTable] = React.useState([]);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [stateCode, setStateCode] = React.useState("");
  const [gst, setGst] = React.useState("");
  const [tin, setTin] = React.useState("");
  const [other, setOther] = React.useState("");

  const [personal, setPersonal] = React.useState("");
  const [home, setHome] = React.useState("");
  const [office, setOffice] = React.useState("");

  const [accountHolderName, setAccountHolderName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [ifscCode, setIfscCode] = React.useState("");
  const [branchName, setBranchName] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);
  const [pageNumber, setPageNumber] = React.useState(1);

  const [itemName, setItemName] = React.useState("");
  const [hsnCode, setHsnCode] = React.useState("");
  const [cgst, setCgst] = React.useState("");
  const [sgst, setSgst] = React.useState("");
  const [igst, setIgst] = React.useState("");
  const [uom, setUom] = React.useState();

  React.useEffect(() => {
    getTraders().then((traders) => {
      console.log(traders);
      setTraders(traders);
    });
    getStates().then((state) => {
      setStates(state);
    });
    getCustomers().then((customers) => {
      setCustomers(customers);
    });
    getItems().then((items) => {
      setItems(items);
    });
    getUoms().then((uoms) => {
      setUoms(uoms);
    });
  }, []);

  const isItemSelected = (code) => {
    return selectedItems.indexOf(code) != -1;
  };

  const openAlert = () => {
    setOpenState(true);
  };
  const closeAlert = () => {
    setOpenState(false);
  };

  const openItemDialog = () => {
    setItemDialogState(true);
  };
  const closeItemDialog = () => {
    setItemDialogState(false);
  };

  const onSelectedAllClicked = () => {
    var selections = [];
    if (areAllSelected) {
      setAreAllSelected(false);
    } else {
      items.forEach((item) => {
        selections.push(item.code);
      });
      setAreAllSelected(true);
    }
    setSelectedItems(selections);
  };

  const addItem = () => {
    //alert(selectedItems+","+hsnCode+","+uom);
    //alert(cgst+","+igst+","+sgst);
    //alert(rate+","+quantity);
    var item = items.find((i) => i.code == selectedItems);
    //alert(item.name);
    var u = uoms.find((u) => u.code == uom);
    //alert(u.name);
    var name = item.name;
    var uName = u.name;
    var amount = rate * quantity;
    var taxableAmount = amount * ((cgst + sgst) / 100);

    setTotalAmount((prevAmount) =>
      (parseFloat(prevAmount) + parseFloat(amount)).toFixed(2)
    );
    setTotalTax((prevTax) =>
      (parseFloat(prevTax) + parseFloat(taxableAmount)).toFixed(2)
    );
    var totalAmountWithTax = parseFloat(taxableAmount) + parseFloat(amount);
    setTotalAmountWithTax((prevTotalAmountWithTax) =>
      (
        parseFloat(prevTotalAmountWithTax) + parseFloat(totalAmountWithTax)
      ).toFixed(2)
    );
    const newItem = {
      name,
      hsnCode,
      uName,
      cgst,
      sgst,
      igst,
      rate,
      quantity,
      taxableAmount,
      amount,
    };
    //itemList.push({itemName,hsnCode,uName,cgst,sgst,igst,rate,quantity});
    setItemForTable((prevItem) => [...prevItem, newItem]);
    //console.log(itemList);
    clearItemForm();
    openAlert();
    closeItemDialog();
    setMessage(`Item added in table`);
    setAlertType("success");
  };

  const clearItemForm = () => {
    setSelectedItems("");
    setHsnCode("");
    setSelectedUoms("");
    setCgst("");
    setSgst("");
    setIgst("");
    setRate("");
    setQuantity("");
  };

  const onTableRowClicked = (code) => {
    var selections = [];
    var index = selectedItems.indexOf(code);
    if (index == -1) {
      // not found
      selections = selections.concat(selectedItems, code);
    } else {
      if (index == 0) selections = selections.concat(selectedItems.slice(1));
      else if (index == selectedItems.length - 1)
        selections = selections.concat(
          selectedItems.slice(0, selectedItems.length - 1)
        );
      else {
        selections = selections.concat(
          selectedItems.slice(0, index),
          selectedItems.slice(index + 1)
        );
      }
    }
    setSelectedItems(selections);
    if (selections.length == 0) setAreAllSelected(false);
    if (selections.length == items.length) setAreAllSelected(true);
  };

  const customerChange = (ev) => {
    setSelectedCustomer(ev.target.value);
    setShowTable(true);
    var customer = customers.find((c) => c.code == ev.target.value);
    customer.stateCode ==
    traders.map((t) => {
      return t.stateCode;
    })
      ? setIsSameState(true)
      : setIsSameState(false);
  };
  const itemChange = (ev) => {
    setSelectedItems(ev.target.value);
    console.log(ev.target.value);
    const code = ev.target.value;
    getItemByCode(code).then((item) => {
      //const item=items.find(i=>i.code==code);
      console.log("Item : " + item);
      var list = [];
      item.forEach((i) => {
        list.push(uoms.find((u) => u.code == i.unitOfMeasurements));
        setHsnCode(i.hsnCode);
        setSgst(i.sgst);
        setIgst(i.igst);
        setCgst(i.cgst);
      });
      setSelectedUoms(list);
      console.log("****************");
      console.log(selectedUoms);
      console.log(list);
      console.log("****************");
    });
  };
  const uomChange = (ev) => {
    setUom(ev.target.value);
    const code = ev.target.value;
    //setUom(uoms.find(u=>u.code==code));
  };
  const onPageSizeChanged = (ev) => {
    setPageSize(ev.target.value);
    setPageNumber(1);
  };

  const onPageChanged = (ev, pg) => {
    setPageNumber(pg + 1);
  };

  const findState = (code) => {
    return states.find((state) => state.code == code);
  };

  const OpenItemModal = () => {
    const [localRate, setLocalRate] = React.useState(rate);
    const [localQuantity, setLocalQuantity] =React.useState(quantity);

    React.useEffect(() => {
      setLocalRate(rate); // Sync local state with parent state
    }, [rate]);

    React.useEffect(() => {
      setLocalQuantity(quantity); // Sync local state with parent state
    }, [quantity]);

    const updateRate = React.useCallback(() => {
      setRate(localRate);
    }, [localRate]);

    const updateQuantity = React.useCallback(() => {
      setQuantity(localQuantity);
    }, [localQuantity]);

    return (
      <Paper>
        <Button
          variant="contained"
          color="primary"
          style={{ float: "right" }}
          onClick={openItemDialog}
        >
          <Add />
        </Button>
        <Dialog
          open={itemDialogState}
          onClose={closeItemDialog}
          disableEscapeKeyDown
          disableBackdropClick
        >
            
          <DialogTitle>Item Details</DialogTitle>
          <DialogContent>
            <Select
              label="Item-name"
              value={selectedItems}
              onChange={itemChange}
              fullWidth
            >
              {items.map((item) => {
                return (
                  <MenuItem key={item.code} id={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>

            <TextField
              disabled
              label="hsnCode"
              value={hsnCode}
              onChange={(ev) => {
                setHsnCode(ev.target.value);
              }}
              fullWidth
            />
            <Select label="uoms" value={uom} onChange={uomChange} fullWidth>
              {selectedUoms.length > 0 &&
                selectedUoms.map((uom) => {
                  return (
                    <MenuItem key={uom.code} id={uom.code} value={uom.code}>
                      {uom.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <TextField
              disabled
              label="cgst"
              value={cgst}
              onChange={(ev) => {
                setCgst(ev.target.value);
              }}
              fullWidth
            />
            <TextField
              disabled
              label="sgst"
              value={sgst}
              onChange={(ev) => {
                setSgst(ev.target.value);
              }}
              fullWidth
            />
            <TextField
              disabled
              label="igst"
              value={igst}
              onChange={(ev) => {
                setIgst(ev.target.value);
              }}
              fullWidth
            />
            <TextField
              required
              label="rate"
              value={localRate}
              onChange={(e) => setLocalRate(e.target.value)}
              onBlur={updateRate} // Update parent state only when user leaves the field
              fullWidth
            />
            <TextField
              required
              label="quantity"
              value={localQuantity}
              onChange={(e) => setLocalQuantity(e.target.value)}
              onBlur={updateQuantity}
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={addItem}>
              Add
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeItemDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  };

  const TraderBankDetails = () => {
    return (
      <Paper>
        <Typography variant="h4">
          <AccountBalance />
          Bank Details
        </Typography>
        {traders.map((trader) => {
          return (
            <Card
              className={styleClasses.customerDetails}
              key={trader.accountNumber}
            >
              <span className={styleClasses.data}>
                Bank Name : {trader.branchName}
              </span>
              <br />
              <span className={styleClasses.data}>
                Account holder name : {trader.accountHolderName}
              </span>
              <br />
              <span className={styleClasses.data}>
                Account Number: {trader.accountNumber}
              </span>
              <br />
              <span className={styleClasses.data}>
                IFSC Code : {trader.ifscCode}
              </span>
              <br />
            </Card>
          );
        })}
      </Paper>
    );
  };

  const TableData = React.memo(() => {
    return showTable ? (
      <Box>
        <TableContainer>
          <OpenItemModal />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < items.length
                    }
                    checked={areAllSelected}
                    onClick={onSelectedAllClicked}
                  />
                </TableCell>
                <TableCell align="right">S.No.</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>HSN Code</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Taxable Amount</TableCell>
                {isSameState ? (
                  <>
                    <TableCell>SGST</TableCell>
                    <TableCell>CGST</TableCell>
                  </>
                ) : (
                  <TableCell>IGST</TableCell>
                )}
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!itemForTable.length ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "15pt",
                    }}
                  >
                    No data available in table
                  </TableCell>
                </TableRow>
              ) : (
                itemForTable
                  .slice(
                    (pageNumber - 1) * pageSize,
                    (pageNumber - 1) * pageSize + pageSize
                  )
                  .map((item, index) => {
                    const selectionState = isItemSelected(selectedItems);
                    return (
                      <TableRow key={item.code}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.hsnCode}</TableCell>
                        <TableCell>{item.uName}</TableCell>
                        <TableCell>{item.rate}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.taxableAmount}</TableCell>
                        {isSameState ? (
                          <>
                            <TableCell>{item.cgst}%</TableCell>
                            <TableCell>{item.sgst}%</TableCell>
                          </>
                        ) : (
                          <TableCell>{item.igst}%</TableCell>
                        )}
                        <TableCell>{item.amount}</TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={7}
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "13pt",
                    textAlign: "right",
                  }}
                >
                  Total Tax
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "10pt",
                  }}
                >
                  {totalTax}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={10}
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "13pt",
                    textAlign: "right",
                  }}
                >
                  Total Amount Without Tax
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "10pt",
                  }}
                >
                  {totalAmount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={10}
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: "13pt",
                    textAlign: "right",
                  }}
                >
                  Total Amount With Tax
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "10pt",
                  }}
                >
                  {totalAmountWithTax}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            count={items.length}
            rowsPerPage={pageSize}
            page={pageNumber - 1}
            onPageChange={onPageChanged}
            onRowsPerPageChange={onPageSizeChanged}
          />
        </TableContainer>
      </Box>
    ) : null;
  });

  const TraderPersonalDetails = () => {
    return (
      <div>
        {!Array.isArray(traders) || !traders.length
          ? null
          : traders.map((trader, index) => {
              //console.log(`Index ${index} :`, trader);
              const stateCode = trader.stateCode;
              if (!trader || !trader.name) return null;
              return (
                <Card
                  key={trader.code}
                  className={styleClasses.customerDetails}
                >
                  <Typography variant="h4">
                    <AccountCircle />
                    {trader.name}
                  </Typography>
                  <span className={styleClasses.data}>
                    <Home />
                    {trader.address}
                  </span>
                  <br />
                  <span className={styleClasses.data}>{trader.gst}</span>
                  <br />
                  <span className={styleClasses.data}>
                    <Place />
                    {states.length > 0 && findState(stateCode)
                      ? findState(stateCode).name
                      : "State not found"}{" "}
                  </span>
                  <br />
                  <span className={styleClasses.data}>
                    <Call />
                    {trader.contact1}
                  </span>
                  &nbsp;&nbsp;
                  <span className={styleClasses.data}>{trader.contact2}</span>
                  &nbsp;&nbsp;
                  <span className={styleClasses.data}>{trader.contact3}</span>
                  <br />
                  <h3>Registration number </h3>
                  <span className={styleClasses.data}>{trader.regValue1}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span className={styleClasses.data}>{trader.regValue2}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span className={styleClasses.data}>{trader.regValue3}</span>
                  &nbsp;&nbsp;&nbsp;
                </Card>
              );
            })}
      </div>
    );
  };

  const CustomerDetails = () => {
    var c;
    return (
      <Paper>
        <Typography variant="h4" className={styleClasses.invoice}>
          Invoice To
        </Typography>

        <Select
          label="customer"
          id="customer"
          value={selectedCustomer}
          onChange={customerChange}
          fullWidth
        >
          {customers.map((customer) => {
            return (
              <MenuItem
                key={customer.code}
                value={customer.code}
                id={customer.code}
              >
                {customer.name}
              </MenuItem>
            );
          })}
        </Select>
        <label className={styleClasses.selectCustomerLabel}>
          Select Customer
        </label>
        <Box>
          {!customers.length
            ? null
            : customers.map((customer) => {
                return customer.code == selectedCustomer ? (
                  <Card
                    key={customer.code}
                    className={styleClasses.customerDetails}
                  >
                    <span className={styleClasses.data}>
                      <AccountCircle />
                      {customer.name}
                    </span>
                    <br />
                    <span className={styleClasses.data}>
                      <Home />
                      {customer.address}
                    </span>
                    <br />
                    <span className={styleClasses.data}>
                      <Call />
                      {customer.contact1}
                    </span>
                    <br />
                    <span className={styleClasses.data}>{customer.gst}</span>
                    <br />
                    <span className={styleClasses.data}>
                      <Place />
                      {findState(customer.stateCode).name}
                    </span>
                    <br />
                  </Card>
                ) : (
                  ""
                );
              })}
        </Box>
      </Paper>
    );
  };
  const styleClasses = myStyles();
  return (
    <Paper className={styleClasses.mainContainer}>
      <Card className={styleClasses.headingsContent}>
        <Typography variant="h3" className={styleClasses.heading}>
          Invoices Generate
        </Typography>
        <Button
          className={styleClasses.button}
          variant="contained"
          color="primary"
        >
          <Delete />
        </Button>
      </Card>

      <Card className={styleClasses.innerContainer}>
        <Box className={styleClasses.rightSideContainer}>
          <TraderPersonalDetails />
        </Box>
      </Card>

      <Card className={styleClasses.innerContainer}>
        <Box className={styleClasses.leftSideContainer}>
          <CustomerDetails />
        </Box>
      </Card>
      <TableData />
      <Card className={styleClasses.innerContainer}>
        <Card className={styleClasses.rightSideContainer}>
          <Typography variant="h4" className={styleClasses.invoice}>
            Invoice Number
          </Typography>
          <FormControl className={styleClasses.inputField}>
            <InputLabel htmlFor="invoice-number">Invoice Number</InputLabel>
            <Input
              className={styleClasses.input}
              id="invoice-number"
              name="invoice-number"
              type="text"
            />
            <FormHelperText id="invoice-number-helper">
              Enter invoice number
            </FormHelperText>
          </FormControl>
          <FormControl className={styleClasses.inputField}>
            <InputLabel htmlFor="invoice-date" shrink>
              Invoice date
            </InputLabel>
            <Input
              className={styleClasses.input}
              id="invoice-date"
              name="invoice-date"
              type="date"
            />
            <FormHelperText id="invoice-date-helper">
              Enter invoice date
            </FormHelperText>
          </FormControl>
        </Card>
      </Card>

      <Card className={styleClasses.innerContainer}>
        <Box className={styleClasses.leftSideContainer}>
          <TraderBankDetails />
        </Box>
      </Card>
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

export default Invoices;
