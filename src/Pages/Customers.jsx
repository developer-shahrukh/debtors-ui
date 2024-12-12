import React from 'react';
import CustomerAddForm from './CustomerAddForm';
import AlertMessage from './AlertMessage';
import { Box, Button, Card, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Delete, Edit, Update } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';



const myStyles = makeStyles((theme) => {
    return ({
        mainContainer: {
            height: "450px",
            display: "flex",
        },
        leftContainer: {
            width: "30%",
            height: "430px",
            margin: "10px",
            overflow: "auto",
        },
        rightContainer: {
            width: "70%",
            height: "430px",
            margin: "10px",
            overflow: "auto",
        },
        li: {
            '&:hover': {
                color: "white",
                background: "orange"
            },
            '&:active': {
                color: "white",
                background: "green"
            },
            listStyle: "none",
            textAlign: "center",
            fontWeight: "bold",
            border: "1px solid gray",
            padding: "5px",
            cursor: "pointer",
            margin: "2px",
            borderRadius: "5px"
        },
        input: {
            display: "flex",
            gap: "10px",
        },
        divButton: {
            display: "flex",
            float: "right",
            margin: "10px",
            gap: "5px"
        },
        button: {
            padding: "10px",
        },
        heading: {
            fontSize: "24pt",
            fontWeight: "bold",
            color: "#2222aa",
            margin: "10px",
            textAlign: "center"
        },
        noRecord: {
            color: "red",
            background: "#e0d2ab",
            listStyle: "none",
            textAlign: "center",
            padding: "10px",
            margin: "5px",
            borderRadius: "20px",
            fontSize: "18pt",
            fontWeight: "600"
        }

    })
});

const getCustomers = () => {
    var promise = new Promise((resolve, reject) => {
        fetch("/getCustomers").then((response) => {
            if (!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((customers) => {
            resolve(customers);
        }).catch((error) => {
            reject(error);
        });
    });
    return promise;
} // getCustomers Function ends here

const getCustomerByCode = (code) => {
    var promise = new Promise((resolve, reject) => {
        fetch(`/getCustomer/${code}`).then((response) => {
            if (!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((customers) => {
            resolve(customers);
        }).catch((error) => {
            reject(error);
        });
    });
    return promise;
} // getCustomerByCode ends here

const getStates = () => {
    var promise = new Promise((resolve, reject) => {
        fetch("/getStates").then((response) => {
            if (!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((states) => {
            resolve(states);
        }).catch((error) => {
            reject(error);
        });
    });
    return promise;
} // getStates ends here



const openCustomerDialog = () => { }

const Customers = (() => {

    const [customers, setCustomers] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [selectedState, setSelectedState] = React.useState(0);


    const [selectedCustomer, setSelectedCustomer] = React.useState();
    const [activeButton, setActiveButton] = React.useState(true);
    const [inputDisabled, setInputDisabled] = React.useState(true);

    const [isEditing, setIsEditing] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const [openState, setOpenState] = React.useState(false);
    const [alertType, setAlertType] = React.useState("");

    const [customerCode, setCustomerCode] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [stateCode, setStateCode] = React.useState("");
    const [gst, setGst] = React.useState("");
    const [tin, setTin] = React.useState("");
    const [other, setOther] = React.useState("");
    const [personal, setPersonal] = React.useState("");
    const [home, setHome] = React.useState("");
    const [office, setOffice] = React.useState("");

    const newCustomerRef = React.useRef(null);

    React.useEffect(() => {
        getCustomers().then((customers) => {
            setCustomers(customers);
            console.log(customers);
        });
        getStates().then((states) => {
            setStates(states);
        });
    }, []);


    const stateChange = (ev) => {
        setSelectedState(ev.target.value);
    }

    const openAlert = () => {
        setOpenState(true);
    }
    const closeAlert = () => {
        setOpenState(false);
    }


    const editCustomer = (ev) => {
        setInputDisabled(false);
        setIsEditing(false);
    }// editCustomer ends 

    const updateCustomer = () => {
        const customerData = {
            code: customerCode,
            name: name,
            address: address,
            stateCode: selectedState,
            regTitlte1: "GST",
            regTitlte2: "TIN",
            regTitlte3: "LIC",
            regValue1: gst,
            regValue2: tin,
            regValue3: other,
            contact1: personal,
            contact2: home,
            contact3: office,
        };

        fetch("/updateCustomer", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(customerData),
        }).then((response) => {
            if (response.ok) {
                setCustomers((prevCustomers) =>
                    prevCustomers.map((customer) =>
                        customer.code === parseInt(customerCode) ? customerData : customer
                    )
                );
                setInputDisabled(true);
                setActiveButton(true);
                setIsEditing(true);
                setOpenState(true);
                setAlertType("success");
                setMessage("Customer updated successfully!");
                clearFormData();
            } else {
                throw new Error("Update failed");
            }
        })
            .catch((error) => {
                console.error(error);
                setOpenState(true);
                setAlertType("error");
                setMessage("Failed to update customer. Please try again.");
            });
    } // Update customer function end here

    const deleteCustomer = () => {
        const cCode=parseInt(customerCode);
        const customer = customers.find((customer) => customer.code === cCode);
        const customerName = customer ? customer.name : "Customer not found";
        fetch(`/deleteCustomer?name=${customerName}`).then((response) => {
                 if (response.ok) {
                     setCustomers((prevCustomers) =>
                         prevCustomers.filter((customer) => customer.code !== cCode)
                     );
                     setInputDisabled(true);
                     setIsEditing(true);
                     setActiveButton(true);
                     setOpenState(true);
                     setAlertType("success");
                     setMessage(`Customer deleted successfully! Code: ${customerCode}`);
                     clearFormData();
                     
                 } else {
                     throw new Error("Deletion failed");
                 }
             })
             .catch((error) => {
                 console.error(error);
                 setOpenState(true);
                 setAlertType("error");
                 setMessage("Failed to delete customer. Please try again.");
             });
    } // delete customer function ends here



    const styleClasses = myStyles();

    const customerSelected = (ev) => {
        // alert('customer id '+ev.currentTarget.id);
        setIsEditing(true);
        setInputDisabled(true);
        setActiveButton(false);
        var code = ev.currentTarget.id;
        setSelectedCustomer(code);
        setCustomerCode(code);
        /*getCustomerByCode(code).then((customer)=>{
           console.log(customer);
        });*/
        const customer = customers.find(customer => customer.code == customerCode);
        console.log(customer);
        fillCustomerForm(customer);
    }

    const fillCustomerForm = (customer) => {
        clearFormData();
        if (!customer) return;
        //console.log(customer);
        //console.log(customer);
        const code = customer.stateCode;
        setSelectedState(code);
        const state = states.find(s => s.code == code);
        setName(customer.name.trim().length == 0 ? "" : customer.name.trim());
        setAddress(customer.address.trim().length == 0 ? "" : customer.address.trim());
        setStateCode(state.name.trim().length == 0 ? "" : state.name.trim());
        setGst(customer.regValue1 == null ? "" : customer.regValue1.trim());
        setTin(customer.regValue2 == null ? "" : customer.regValue2.trim());
        setOther(customer.regValue3 == null ? "" : customer.regValue3.trim());
        setPersonal(customer.contact1 == null ? "" : customer.contact1);
        setHome(customer.contact2 == null ? "" : customer.contact2);
        setOffice(customer.contact3 == null ? "" : customer.contact3);
    }
    const clearFormData = () => {
        setName("");
        setAddress("");
        setStateCode(selectedState);
        setGst("");
        setTin("");
        setOther("");
        setPersonal("");
        setHome("");
        setOffice("");
    }


    return (
        <Paper className={styleClasses.mainContainer}>

            <Card className={styleClasses.leftContainer}>
               <Typography className={styleClasses.heading} variant='h5'>Customers Details</Typography>
                {
                    customers.length == 0 ? <li className={styleClasses.noRecord}>Oops! No Record Found</li> :
                        customers.map((customer, index) => {
                            return (

                                <li
                                    className={styleClasses.li}
                                    id={customer.code}
                                    onClick={customerSelected}
                                    hover
                                    key={customer.code || index}
                                    ref={index == customers.length - 1 ? newCustomerRef : null}
                                >{customer.name}
                                    <br />
                                    <span>{customer.address}</span>
                                </li>
                            )
                        })
                }
            </Card>
            <Card className={styleClasses.rightContainer}>
                <Box className={styleClasses.divButton}>
                    <CustomerAddForm
                        states={states}
                        customers={customers}
                        setStates={setStates}
                        setCustomers={setCustomers}
                        openState={openState}
                        setOpenState={setOpenState}
                        setMessage={setMessage}
                        setAlertType={setAlertType}
                        AlertMessage={AlertMessage}
                        clearFormData={clearFormData}
                        setInputDisabled={setInputDisabled}
                        setActiveButton={setActiveButton}
                        setIsEditing={setIsEditing}
                        newCustomerRef={newCustomerRef}
                    />
                    {isEditing && <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={editCustomer}><Edit /></Button>}
                    {!isEditing && <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={updateCustomer}><Update />Update</Button>}
                    <Button className={styleClasses.button} variant='contained' color='primary' disabled={activeButton} onClick={deleteCustomer}><Delete /></Button>
                </Box>
                <DialogTitle >Personal Information</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="Name" value={name} onChange={(ev) => setName(ev.target.value)} required disabled={inputDisabled} />
                    <InputForm title="Address" value={address} onChange={(ev) => setAddress(ev.target.value)} required disabled={inputDisabled} />
                    <FormControl>
                        <InputLabel id="state-select-label">States</InputLabel>
                        <Select
                            labelId="state-label"
                            id="state"
                            value={selectedState}
                            disabled={inputDisabled}
                            onChange={stateChange}
                        >
                            {
                                states.map((state,index) => {
                                    return (
                                        <MenuItem key={state.code || index} id={state.code} value={state.code} selected>{state.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogTitle>Registration Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="Gst" value={gst} onChange={(ev) => setGst(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="Tin" value={tin} onChange={(ev) => setTin(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="Other" value={other} onChange={(ev) => setOther(ev.target.value)} disabled={inputDisabled} />
                </DialogContent>
                <DialogTitle>Contact Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="Personal Contact" value={personal} onChange={(ev) => setPersonal(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="Home Contact" value={home} onChange={(ev) => setHome(ev.target.value)} disabled={inputDisabled} />
                    <InputForm title="Office Contact" value={office} onChange={(ev) => setOffice(ev.target.value)} disabled={inputDisabled} />
                </DialogContent>

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
    )
});


const InputForm = (props) => {
    return (
        <Paper>
            <TextField
                label={props.title}
                required={props.required}
                variant="outlined"
                onChange={props.onChange}
                id={props.title}
                value={props.value}
                disabled={props.disabled}
            />
        </Paper>
    )
}


export default Customers;
