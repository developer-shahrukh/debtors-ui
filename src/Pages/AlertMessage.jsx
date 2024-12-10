import { Alert, Grow, Snackbar } from "@mui/material";


const AlertMessage=(props)=>{
    //const transitionType=slide;
    //const direction="up";
    const transitionType=Grow;
    return (
        <Snackbar
        open={props.openState}
        autoHideDuration={props.duration}
        anchorOrigin={{
            "horizontal": props.horizontalAlignment,
            "vertical": props.verticalAlignment
        }}
    
        TransitionComponent={transitionType}
       // TransitionProps={{direction}}
        onClose={props.onClose}
        >
            <Alert
            elevation={4}
            variant='filled'
            severity={props.alertType}
            onClose={props.onClose}
            >
                {props.message}
                </Alert>
        </Snackbar>
    );
}

export default AlertMessage;