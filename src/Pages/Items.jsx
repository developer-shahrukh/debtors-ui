import React from 'react';
import ItemAddForm from './ItemAddForm';
import AlertMessage from './AlertMessage';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import {Edit , Delete} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const myStyles=makeStyles((theme)=>{
    return ({
    mainContainer: {
        flexGrow:1,
        marginTop:"70px",
        padding:"20px",
        margin:"10px",
        border:"1px solid black",
        borderRadius:"50px",
        background: "#e1eaf5"
    },
    content:{
        padding: "10px",
        textAlign:"center",
        color:"gray",
    },
    mainHeading: {
        fontSize: "24pt",
        fontWeight: "bold",
        color: "#2222aa"
    },
    itemAddForm: {
        float: "right"
    },
    tableData:{
        '&:hover':{
            color: "white",
            background: "orange",
            cursor:"pointer"
        },
        '&:active':{
                color:"white",
                background:"green"
            },
        cusrsor:"pointer",
    },
    detailsPanel:{
        display:"flex",
        height: "175px",
        border: "1px solid black",
        borderRadius:"40px",
        margin:"200px",
        marginTop: "5px"
    },
    detailsContentLeft:{
        padding: "10px",
        fontWeight:"600",
        dispaly:"flex",
        height:"140px",
        width: "50%",
        margin:"5px",   
    },
    itemHeading:{
        padding:"10px",
        fontSize: "22pt",
        fontWeight: "bold",
        color: "#3461a3"
    },
    detailsContentRight:{
        padding: "10px",
        fontWeight:"600",
        dispaly:"flex",
        height:"140px",
        width: "50%",
        margin:"5px",
        textAlign:"center",
        
    },
    uom:{
        border: "1px solid black",  
        borderRadius: "20px",
        height:"140px",
        width:"70%",
        textAlign:"center",
        overflow:"auto",
        
    },
    uomHeading:{
        color:"white",
        background:"gray",
        padding:"2px",
        marginTop: "10px",
        
    }
})
});


const getItems=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch("/getItems").then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((items)=>{
            resolve(items);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}
    
const getUoms=()=>{
    var promise=new Promise((resolve,reject)=>{
        fetch("/getUoms").then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
            return response.json();
        }).then((uoms)=>{
            resolve(uoms);
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}

const getByCode=(code)=>{
    var promise=new Promise((resolve,reject)=>{
        fetch(`/getByCode?code=/${code}`).then((response)=>{
            if(!response.ok) throw Error("Unable to fetch data,try after some time");
                return response.json();
            }).then((item)=>{
                resolve(item);
            }).catch((error)=>{
                reject(error);
            });
        });
        return promise;
    }
   


const editItem=(ev)=>{
    alert(ev.currentTarget.id);
}


const Items=(()=>{

    const [items,setItems]=React.useState([]);
    const [uoms,setUoms]=React.useState([]);
    const [showProgress,setShowProgress]=React.useState(true);
    const [selectedItemCode,setSelectedItemCode]=React.useState(0);

    const [message,setMessage]=React.useState("");
    const [openState,setOpenState]=React.useState(false);
    const [alertType,setAlertType]=React.useState("");

    const [pageSize,setPageSize]=React.useState(5);
    const [pageNumber,setPageNumber]=React.useState(1);

    const styleClasses=myStyles();

    React.useEffect(()=>{
        getItems().then((items)=>{
            setItems(items);
            setShowProgress(false); 
        });
        getUoms().then((uoms)=>{
            setUoms(uoms);
        });
    },[]);

    const openAlert=()=>{
        setOpenState(true);
        setTimeout(() => {
        }, 0);
    }
    const closeAlert=()=>{
        setOpenState(false);
    }

    const deleteItem=(ev)=>{
        var code=ev.currentTarget.id;
        fetch(`deleteItemByCode?code=${code}`).then((response)=>{
            if(response.ok){
               setItems(items.filter(item=>item.code!=code));
            }
        })
        .catch((error)=>{
            console.log(error);
        });
    } // delete function ends here 

    
    const onPageSizeChanged=(ev)=>{
        setPageSize(ev.target.value);
        setPageNumber(1);
    }

    const onPageChanged=(ev,pg)=>{
        setPageNumber(pg+1);
    }

    const ItemSelected=(ev)=>{
        //alert('Item Id '+ev.currentTarget.id);
        setSelectedItemCode(ev.currentTarget.id);
    }
    
    const UpdateItemTable=()=>{
        return(
            <div className={styleClasses.mainContainer}>
            <div className={styleClasses.mainHeading}>Debtors Accounting</div>
            <h1 className={styleClasses.itemHeading}>Items Details</h1>
            <div className={styleClasses.content}>
              
                <div style={{float:"right"}}>
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
                </div>
                <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='right'>S.No.</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>HSN Code</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length==0 ? <TableCell colSpan={5} style={{color:"red",textAlign:"center",fontSize:"26pt",background:"#e0d2ab",borderRadius:"40px"}}>Oops! No Record Found</TableCell>:
                        items.slice((pageNumber-1)*pageSize,(pageNumber-1)*pageSize+pageSize).map((item,idx)=>{
                            return(
                                <TableRow className={styleClasses.tableData} onClick={ItemSelected} id={item.code} key={item.code}>
                                    <TableCell align='right'>{(pageNumber-1)*pageSize+(idx+1)}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.hsnCode}</TableCell>
                                    <TableCell><Edit style={{cursor:"pointer"}} id={item.code} onClick={editItem}/></TableCell>
                                    <TableCell><Delete style={{cursor:"pointer"}} id={item.code} onClick={deleteItem}/></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
            <TablePagination
            component="div"
            rowsPerPageOptions={[5,10,15,20,25]}
            count={items.length}
            rowsPerPage={pageSize}
            page={pageNumber-1}
            onChangePage={onPageChanged}
            onChangeRowsPerPage={onPageSizeChanged}
            />
            
                {showProgress && <CircularProgress/>}
            </div>
          {selectedItemCode!=0 && <ItemDetails/>}
        </div>
        )
    }


    const ItemDetails=()=>{
        const item=items.find(i=>i.code==selectedItemCode);
        console.log(item);
        const styleClasses=myStyles();
        return !item || !item.name ? null : 
            <div className={styleClasses.detailsPanel}>
                <div className={styleClasses.detailsContentLeft}>
                    <span className={styleClasses.itemHeading}>Item Details</span><br/>
                    <span className={styleClasses.detailsContent}>Item Name : {item.name}</span><br/>
                    <span className={styleClasses.detailsContent}>HSN Code : {item.hsnCode}</span><br/>
                    <span className={styleClasses.detailsContent}>CGST : {item.cgst}</span><br/>
                    <span className={styleClasses.detailsContent}>SGST : {item.sgst}</span><br/>
                    <span className={styleClasses.detailsContent}>IGST : {item.igst}</span><br/>
                </div>
                <div className={styleClasses.detailsContentRight}>
                    <div className={styleClasses.uom} >
                        <span className={styleClasses.uomHeading}>Unit of Measurements</span><br/>
                            
                    </div>
                </div>
                <AlertMessage
                    openState={openState}
                    duration={3000}
                    horizontalAlignment="center"
                    verticalAlignment="bottom"
                    onClose={closeAlert}
                    alertType={alertType}
                    message={message}
                />
            </div>
        
    }
    
    return (
        <UpdateItemTable/>
    );    
});



export default Items;