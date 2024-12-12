import React from 'react';
import AlertMessage from './AlertMessage';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

// The following is just for testing


const CustomerAddForm=(props)=>{
    const [customerDialogState,setCustomerDialogState]=React.useState(false);

    const [name,setName]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [stateCode,setStateCode]=React.useState();
    const [selectedState,setSelectedState]=React.useState(0);
    const [gst,setGst]=React.useState("");
    const [tin,setTin]=React.useState("");
    const [other,setOther]=React.useState("");
    const [personalContact,setPersonalContact]=React.useState("");
    const [homeContact,setHomeContact]=React.useState("");
    const [officeContact,setOfficeContact]=React.useState("");

    const [snackbarOpenState,setSnackbarOpenState]=React.useState("");
    const [snackbarMessage,setSnackbarMessage]=React.useState("");

    const [nameError,setNameError]=React.useState("");
    const [addressError,setAddressError]=React.useState("");    
    const [stateError,setStateError]=React.useState("");
    const[isName,setIsName]=React.useState(false);
    const [isAddress,setIsAddress]=React.useState(false);
    const [isState,setIsState]=React.useState(false);
    const stateChange=(ev)=>{
        setSelectedState(ev.target.value);
    }

    const openCustomerDialog=()=>{
        setCustomerDialogState(true);
    }
    const clearCustomerForm=()=>{
        setName("");
        setAddress("");
    }
    const closeCustomerDialog=()=>{
        setCustomerDialogState(false);
        clearCustomerForm();
    }
    const closeSnackbar=()=>{
        setSnackbarOpenState(false);
        setSnackbarMessage("");
    }

    const clearFormData=()=>{
        setName("");
        setAddress("");
        setStateCode(selectedState);
        setGst("");
        setTin("");
        setOther("");
        setPersonalContact("");
        setHomeContact("");
        setOfficeContact("");
    }

    const clearAllErrors=()=>{
        setNameError("");
        setAddressError("");
        setStateError("");
        setIsName(false);
        setIsAddress(false);
        setIsState(false);
    }
    const validateForm=()=>{
        var hashError=false;
        if(!name || name.length==0){
            hashError=true;
            setIsName(true);
            setNameError("Name required");
        }
        if(!address || !address.length){
            hashError=true;
            setIsAddress(true);
            setAddressError("Address is compulsory");
        }
        return hashError;
    }

    const customer=()=>{
        clearAllErrors();
        var code=0;
        if(validateForm()){
            return;
        }
        /*if(name.length===0){
            props.setOpenState(true);
            props.setAlertType('warning');
            props.setMessage("Enter name")
            return;
        }
        if(address.length===0){
                props.setOpenState(true);
                props.setAlertType('warning');
                props.setMessage("Enter address")
                return;
            }*/
        if(selectedState==0){
            props.setOpenState(true);
            props.setAlertType('error');
            props.setMessage("Select State");
            return;
        }
        const customerData={
            "name": name,
            "address": address,
            "stateCode": selectedState,
            "regTitlte1": "GST",
            "regTitlte2": "TIN",
            "regTitlte3": "LIC",
            "regValue1": gst,
            "regValue2": tin,
            "regValue3": other,
            "contact1": personalContact,
            "contact2": homeContact,
            "contact3": officeContact
        };

        fetch("/addCustomer",{
            method: "Post",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(customerData)
        }).then((response)=>{
            if(response.ok){
                props.setInputDisabled(true);
                props.setActiveButton(true);
                props.setIsEditing(true);
                props.setOpenState(true);
                props.setAlertType("success");
                props.setMessage(`Customer ${customerData.name} added`);
                const addCustomers=[...props.customers];
                addCustomers.push(customerData);
                props.setCustomers(addCustomers);
                setSelectedState(0);
                clearFormData();   
                closeCustomerDialog();  
                setTimeout(() => {
                    if (props.newCustomerRef.current) {
                      props.newCustomerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      //props.newCustomerRef.current.click();
                    }
                  }, 0);          
            }
        }).catch((error)=>{
            alert('error');
            props.setInputDisabled(true);
            props.setActiveButton(true);
            props.setIsEditing(true);
            props.setOpenState(true);
            props.setAlertType("error");
            props.setMessage(`Error ${error}`);
        });
    }
   
    return(
        <div>
            <Button variant='contained' color='primary'
            onClick={openCustomerDialog}><Add/></Button>
            <Dialog
             open={customerDialogState}
             onClose={closeCustomerDialog}
             disableEscapeKeyDown
             disableBackdropClick
             >
                <DialogTitle>Add customer Form</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        error={isName}
                        helperText={nameError}
                        value={name}
                        onChange={(ev)=>{setName(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        error={isAddress}
                        helperText={addressError}
                        label="Address"
                        value={address}
                        onChange={(ev)=>{setAddress(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="Gst number"
                        value={gst}
                        onChange={(ev)=>{setGst(ev.target.value);}}
                        fullWidth/>

                    <TextField
                        label="Tin number"
                        value={tin}
                        onChange={(ev)=>{setTin(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="Other"
                        value={other}
                        onChange={(ev)=>{setOther(ev.target.value);}}
                        fullWidth/>

                    <TextField
                        label="Personal contact"
                        value={personalContact}
                        onChange={(ev)=>{setPersonalContact(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="Home contact"
                        value={homeContact}
                        onChange={(ev)=>{setHomeContact(ev.target.value);}}
                        fullWidth/>
                    <TextField
                        label="Office contact"
                        value={officeContact}
                        onChange={(ev)=>{setOfficeContact(ev.target.value);}}
                        fullWidth/>
                    <FormControl>
                        <InputLabel id="state-select-label" >States</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                value={selectedState}
                                onChange={stateChange}
                                fullWidth
                            >
                                {
                                    props.states.map((state,index)=>{
                                        return(
                                            <MenuItem key={state.code || index} id={state.code} value={state.code} selected>{state.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={customer}>Add</Button>
                    <Button variant='contained' color='primary' onClick={closeCustomerDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar 
            open={snackbarOpenState==="true"}
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
                alertType="success"
                message={props.message}
            />
        </div>
    );
}

export default CustomerAddForm;