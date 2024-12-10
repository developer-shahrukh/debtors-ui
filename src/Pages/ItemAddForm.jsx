import React from 'react';
import './CSS/ItemAddForm.css'
import AlertMessage from './AlertMessage';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
import { Add, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';



const ItemAddForm = (props) => {
    const [itemDialogState, setItemDialogState] = React.useState(false);
    const [name, setName] = React.useState("");
    const [hsnCode, setHsnCode] = React.useState("");
    const [cgst, setCgst] = React.useState("");
    const [sgst, setSgst] = React.useState("");
    const [igst, setIgst] = React.useState("");
    const [uoms, setUoms] = React.useState([]);
    const [snackbarOpenState, setSnackbarOpenState] = React.useState("");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const [formError, setFormError] = React.useState("");
    const [isName, setIsName] = React.useState(false);
    const [isHsnCode, setIsHsnCode] = React.useState(false);
    const [isCgst, setIsCgst] = React.useState(false);
    const [isSgst, setIsSgst] = React.useState(false);
    const [isIgst, setIsIgst] = React.useState(false);
    //const [hashError,setHashError]=React.useState(false);

    const [nameError, setNameError] = React.useState("");
    const [hsnCodeError, setHsnCodeError] = React.useState("");
    const [cgstError, setCgstError] = React.useState("");
    const [sgstError, setSgstError] = React.useState("");
    const [igstError, setIgstError] = React.useState("");
    const [uomsError, setUomsError] = React.useState("");

    const [leftList, setLeftList] = React.useState([props.uoms]);
    const [rightList, setRightList] = React.useState([]);
    const [selectedRightItems, setSelectedRightItems] = React.useState([]);
    const [selectedLeftItems, setSelectedLeftItems] = React.useState([]);

    React.useEffect(() => {
        setLeftList(props.uoms);
        props.setOpenState(false);
    }, []);

    const handleSelectRightItem = (item) => {
        setSelectedRightItems(prevSelectedItems => {
            if (prevSelectedItems.includes(item)) {
                return prevSelectedItems.filter(i => i !== item);
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };

    const handleSelectLeftItem = (item) => {
        setSelectedLeftItems(prevSelectedItems => {
            if (prevSelectedItems.includes(item)) {
                return prevSelectedItems.filter(i => i !== item);
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };

    const handleMoveToRight = () => {
        setRightList(prevRightList => [...prevRightList, ...selectedRightItems]);
        setLeftList(prevLeftList => prevLeftList.filter(item => !selectedRightItems.includes(item)));
        setSelectedRightItems([]);
    };

    const handleMoveToLeft = () => {
        setLeftList(prevLeftList => [...prevLeftList, ...selectedLeftItems]);
        setRightList(prevRightList => prevRightList.filter(item => !selectedLeftItems.includes(item)));
        setSelectedLeftItems([]);
    };



    const openItemDialog = () => {
        setItemDialogState(true);
    }
    const closeItemDialog = () => {
        console.log("Cancel add form");
        setItemDialogState(false);
        clearFormData();
    }
    const closeSnackbar = () => {
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }
    const clearFormData = () => {
        setName("");
        setHsnCode("");
        setCgst("");
        setSgst("");
        setIgst("");
        setRightList([]);
    }
    const clearAllErrors = () => {
        setFormError("");
        setNameError("");
        setHsnCodeError("");
        setCgstError("");
        setSgstError("");
        setIgstError("");
        setUomsError("");
        setIsName(false);
        setIsHsnCode(false);
        setIsCgst(false);
        setIsSgst(false);
        setIsIgst(false);
        //setHashError(false);
    }
    const validateForm = () => {
        var hashError = false;
        console.log('Before validation : ' + hashError);
        if (!name || name.length == 0) {
            hashError = true;
            setIsName(true);
            setNameError("Item Name required");
        }
       /* if (!hsnCode || hsnCode <= 0) {
            hashError = true;
            setIsHsnCode(true);
            setHsnCodeError("HSN Code cannot be zero");
        }*/
        const regex = /^[0-9]{4,8}$/;
        if (!regex.test(hsnCode)) {
            setIsHsnCode(true);
            setHsnCodeError("HSN code must be 4, 6, or 8 digits long.");
            if(hsnCode<0){
                setHsnCodeError("HSN Code cannot be negative");
            }
        }
        if (!cgst) {
            hashError = true;
            setIsCgst(true);
            setCgstError("CGST required");
        }
        if (cgst.length > 2) {
            hashError = true;
            setIsCgst(true);
            setCgstError("CGST only 2 digit");
            if (!cgst >= 0 && !cgst <= 9) {
                hashError = true;
                setIsCgst(true);
                setCgstError("Cgst cannot be negative");
            }
        }
        
        if (!sgst) {
            hashError = true;
            setIsSgst(true);
            setSgstError("SGST required");
        }
        if (sgst.length > 2) {
            hashError = true;
            setIsSgst(true);
            setSgstError("SGST only 2 digit");
            if (!sgst >= 0 && !sgst <= 9) {
                hashError = true;
                setIsSgst(true);
                setSgstError("Sgst cannot be negative");
            }
        }
        if (!igst) {
            hashError = true;
            setIsIgst(true);
            setIgstError("IGST required");
        }
        if (igst.length > 2) {
            hashError = true;
            setIsIgst(true);
            setIgstError("IGST only 2 digit");
            if (!igst >= 0 && !igst <= 9) {
                hashError = true;
                setIsIgst(true);
                setIgstError("Igst cannot be negative");
            }
        }
        if (!rightList.length) {
            hashError = true;
            setUomsError("Select at least one uom");
        }
        console.log('After validation : ' + hashError);
        return hashError;
    }

    const addItem = () => {
        console.log("Add Item requiest");
        clearAllErrors();
        var code = 0;
        if (validateForm()) {
            return;
        }
        //console.log(props.openState,props.alertType,props.message)
        var itemData = {
            code: code,
            name: name,
            hsnCode: hsnCode,
            cgst: cgst,
            sgst: sgst,
            igst: igst,
            uom: rightList
        };
        fetch("/addItem", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(itemData)
        }).then((response) => {
            console.log("if response");
            if (response.ok) {
                console.log("Item with response : "+response);
                console.log(response);
                setItemDialogState(true);
                props.openAlert();
                props.setAlertType("success");
                props.setMessage(`Item ${name} added`);
                //const addItem=[...props.items];
                //addItem.push(itemData);
                //props.setItems(addItem);
                console.log(props.openState, props.alertType, props.message)
                //clearFormData();   
            }
        }).catch((error) => {
            alert(error.message);
            setItemDialogState(true);
            props.openAlert();
            props.setAlertType("error");
            props.setMessage(`${error.message}`);
            clearFormData();
        });
    }

    return (
        <div>
            <Button variant='contained' color='primary'
                onClick={openItemDialog}><Add/></Button>
            <Dialog
                open={itemDialogState}
                onClose={closeItemDialog}
                disableEscapeKeyDown
                disableBackdropClick
            >
                <DialogTitle>Add Item Form</DialogTitle>
                <span className={"error"}>{formError}</span>
                <DialogContent>
                    <TextField
                        required
                        label="Item Name"
                        value={name}
                        onChange={(ev) => { setName(ev.target.value); }}
                        error={isName}
                        helperText={nameError}
                        fullWidth />

                    <TextField
                        required
                        label="HSN Code"
                        value={hsnCode}
                        onChange={(ev) => { setHsnCode(ev.target.value); }}
                        error={isHsnCode}
                        helperText={hsnCodeError}
                        fullWidth />
                    <TextField
                        required
                        label="Cgst"
                        value={cgst}
                        onChange={(ev) => { setCgst(ev.target.value); }}
                        error={isCgst}
                        helperText={cgstError}
                        fullWidth />
                    <TextField
                        required
                        label="Sgst"
                        value={sgst}
                        onChange={(ev) => { setSgst(ev.target.value); }}
                        error={isSgst}
                        helperText={sgstError}
                        fullWidth />
                    <TextField
                        required
                        label="Igst"
                        value={igst}
                        onChange={(ev) => { setIgst(ev.target.value); }}
                        error={isIgst}
                        helperText={igstError}
                        fullWidth />
                    <div className={"mainContainer"}>
                        <div className={"leftContainer"}>
                            <h3 className={"heading"}>Select From</h3>
                            {leftList.map(item => (
                                <div key={item.code} id={item.code}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRightItems.includes(item)}
                                        onChange={() => handleSelectRightItem(item)}
                                    />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className={"buttonContainer"}>
                            <button onClick={handleMoveToRight}><ArrowForwardIos /></button>
                            <button onClick={handleMoveToLeft}><ArrowBackIos /></button>
                        </div>
                        <div className={"rightContainer"}>
                            <h3 className={"heading"}>Selected</h3>
                            {rightList.map(item => (
                                <div key={item.code} id={item.code}>
                                    <input
                                        type="checkbox"
                                        checked={selectedLeftItems.includes(item)}
                                        onChange={() => handleSelectLeftItem(item)}
                                    />
                                    {item.name}
                                </div>
                            ))}
                            <span className={"error"}>{uomsError}</span>
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={addItem}>Add</Button>
                    <Button variant='contained' color='primary' onClick={closeItemDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpenState}
                message={snackbarMessage}
                onClose={closeSnackbar}
                autoHideDuration={5000}
            />
            <AlertMessage
                openState={props.openState}
                duration={3000}
                horizontalAlignment="center"
                verticalAlignment="bottom"
                onClose={props.closeAlert}
                alertType={props.alertType}
                message={props.message}
            />
        </div>
    );
}

export default ItemAddForm;