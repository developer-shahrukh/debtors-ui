import { Delete, Edit, Update } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const myStyles = makeStyles((them) => {
    return ({
        mainContainer: {
            height: "485px",
            overflow: "auto",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        title: {
            fontSize: "24pt",
            fontWeight: "bold",
            color: "#2222aa",
            margin: "10px",
            float: "left"
        },
        content: {
            height: "430px",
            margin: "10px",
            

        },
        input: {
            display: "flex",
            gap: "10px"
        },
        textField: {
            width: "430px",
        },
        divButton: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            gap: "5px"
        },
    })
});




const getTraders = async () => {
    try {
        const response = await fetch("/getTrader");
            if (!response.ok) throw Error("Unable to fetch data,try after some time");
            const traders = await response.json();
            return traders;
        } catch (error) {
            throw error;
        };
    };
    
const getStates=async ()=>{
    try {
        const response=await fetch("/getStates");
        const states=await response.json();
        if(!response.ok) throw Error("Unable to fetch data,try after some time");
    console.log('states '+states);
        return states;
    } catch(error){
        throw error;
    }
}

const openTraderDialog = () => {

}

const Traders = (() => {

    const [traders, setTraders] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [selectedState, setSelectedState] = React.useState('');


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


    const [isDisabledButton, setIsDisabledButton] = React.useState(false);
    const [inputDisabled, setInputDisabled] = React.useState(false);

    const styleClasses = myStyles();

    React.useEffect(() => {
        Promise.all([getTraders(), getStates()]).then(([traders, states]) => {
            console.log(`After fetching traders dataaaa : ${traders}`);
            console.log(`After fetching state dataaaa : ${states}`);
            setTraders(traders);
            setStates(states);
            console.log(`After fetching data : ${states}`);
            console.log(`After fetching traders data : ${traders}  `+JSON.stringify(traders));
            
            fillForm();
            setInputDisabled(true);
        }).catch((error) => {
            console.log(`Error : ${error}`);
        });
    }, []);

    React.useEffect(() => {
        console.log("Traders state updated:", traders);
        fillForm();
    }, [traders]);


    const stateChange = (ev) => {
        //alert(ev.target.value);
        setSelectedState(ev.target.value);
    }



    const fillForm = () => {
        console.log('Fill form called'+JSON.stringify(traders));
        traders.forEach((trader) => {
            console.log('Traders : ' + trader);
            if (!trader) return null;
            setName(trader.name);
            setAddress(trader.address);
            setSelectedState(trader.stateCode);
            const state = states.find(s => s.code == trader.stateCode);
            setStateCode(state.name);
            setGst(trader.regValue1);
            setTin(trader.regValue2);
            setOther(trader.regValue3);
            setPersonal(trader.contact1);
            setHome(trader.contact2);
            setOffice(trader.contact3);
            setAccountHolderName(trader.accountHolderName);
            setAccountNumber(trader.accountNumber);
            setIfscCode(trader.ifscCode);
            setBranchName(trader.branchName);
        });
    }

    const editTraders = () => {
        //alert('click')
        setIsDisabledButton(true);
        setInputDisabled(false);
    }

    const updateTraders = (e) => {

        const tradersData = {
            "name": name,
            "address": address,
            "gst": gst,
            "stateCode": stateCode,
            "tin": tin,
            "other": other,
            "personal": personal,
            "home": home,
            "office": office,
            "accountHolderName": accountHolderName,
            "accountNumber": accountNumber,
            "ifscCode": ifscCode,
            "branchName": branchName
        };
        console.log(tradersData);
        /*fetch("/updateTrader",{
         method:"Put",
         header:{
             "content-type": "application/json"
         },
         body: JSON.stringify(tradersData)
        })
        .then((response)=>{
            if(response.ok){
                setInputDisabled(true);
                setIsDisabledButton(false);
            }
        })
        .then(trader=> console.log(trader))
        .catch(error=> console.log(error));*/
    }
    return (

        <Paper className={styleClasses.mainContainer}>
            <Card className={styleClasses.header}>
                <h1 className={styleClasses.title}>Trader Details</h1>
                <CardActions className={styleClasses.divButton}>
                    <Button variant='contained' color='primary' onClick={editTraders} disabled={isDisabledButton}><Edit /></Button>
                    <Button variant='contained' color='primary' onClick={updateTraders} disabled={!isDisabledButton}><Update />Update</Button>
                    <Button variant='contained' color='primary' disabled={!isDisabledButton}><Delete /></Button>

                </CardActions>
            </Card>
            <Box className={styleClasses.content}>
                <Typography variant='h6' >Personal Information</Typography>
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
                                states && states.length > 0 && states.map((state ,index) => {
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
                <DialogTitle >Bank Details</DialogTitle>
                <DialogContent className={styleClasses.input}>
                    <InputForm title="Account Holder Name" required onChange={(ev) => setAccountHolderName(ev.target.value)} value={accountHolderName} disabled={inputDisabled} />
                    <InputForm title="Account Number" required onChange={(ev) => setAccountNumber(ev.target.value)} value={accountNumber} disabled={inputDisabled} />
                    <InputForm title="Ifsc Code" required onChange={(ev) => setIfscCode(ev.target.value)} value={ifscCode} disabled={inputDisabled} />
                    <InputForm title="Branch Name" required onChange={(ev) => setBranchName(ev.target.value)} value={branchName} disabled={inputDisabled} />
                </DialogContent>
            </Box>


        </Paper>
    );

});

const InputForm = ({ title, value, required, disabled, onChange }) => {

    const styleClasses = myStyles();
    return (
        <div>
            <TextField
                className={styleClasses.textField}
                label={title}
                required={required}
                variant="outlined"
                value={value}
                id={title}
                onChange={onChange}
                disabled={disabled}
                fullWidth
            />
        </div>
    )
}
export default Traders;