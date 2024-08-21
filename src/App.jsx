import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Spinner from 'react-bootstrap/Spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 'survey-core/defaultV2.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
export const API_BASE_URL = import.meta.env.BASE_URL;
import axios from 'axios';
import LogoFinal from "/Users/godofthunder/Desktop/Email_trigger/src/assets/LogoFinal.png"

function App() {

  const remoteServerForLocal = "https://e2e-qa.fortytwo42.in:9443";


  let baseUrl = window.location.origin.toString();

  if (baseUrl.includes('localhost')) {
    baseUrl = remoteServerForLocal;
  }
  //Declaration of all the States.
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [userNamee, setUserNamee] = useState("");
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState("Account Deletion Request")
  const [to, setTo] = useState('ybl-support@fortytwo42.in');
  const [text, setText] = useState('Dear Team, Request for user deletion submitted for mobile number ');
  const [phoneValidation, setPhoneValidation] = useState(false);


  //Function to close the Dialog box.
  const handleClose = (value) => {
    setOpen(false);
  };

  //UseEffect hook to set the Text State every time a change occurs in any of the three relevant fields. 
  useEffect(() => {
    if (phoneNumber !== "" && name !== "" && userNamee !== "") {
      setText(`Dear Team, Request for user deletion submitted for mobile number ${phoneNumber}.\n Name: ${name} \n Email: ${userNamee}`);

    } else if (phoneNumber !== "" && name !== "") {
      setText(`Dear Team, Request for user deletion submitted for mobile number ${phoneNumber}.\n Name: ${name}`);
    } else if (phoneNumber !== "" && userNamee !== "") {
      setText(`Dear Team, Request for user deletion submitted for mobile number ${phoneNumber}.\n Email: ${userNamee}`);
    } else if (phoneNumber !== "") {
      setText(`Dear Team, Request for user deletion submitted for mobile number ${phoneNumber}.`);
    } else {
      setText(``);
    }
  }, [name, phoneNumber, userNamee]);

  //Handle Change function to monitor the changes made in the input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);

      if (value === "") {
        setPhoneValidation(true);
      } else {
        setPhoneValidation(false);
      }
    } else if (name === "userNamee") {
      setUserNamee(value);
    }
  };

  //Handle submit function for handling the submit event.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (phoneNumber == "") {
      setPhoneValidation(true);
    } else {
      setPhoneValidation(false);
    }
    const emailData = { to, subject, text };

    if (phoneNumber == "") {
      setPhoneValidation(true);
      toast.error("Failed to send email")
    } else {
      setLoading(true);

      // try {
      //   setLoading(true);


      //   const response = await fetch(`http://127.0.0.1:8080/send-email`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(emailData),
      //   });

      //   const result = await response.json();

      //   if (response.ok) {
      //     setLoading(false);
      //     setUserNamee('');
      //     setName('');
      //     setPhoneNumber('');
      //     setOpen(true);
      //   } else {
      //     setLoading(false);
      //     console.error(result.error);
      //     toast.error("Failed to send email")
      //   }
      // } catch (error) {
      //   setLoading(false);
      //   console.error(error);
      // }

      const data = {
        "mobile": phoneNumber,
        "username": userNamee,
        "fullName": name
      }
      axios
        .post(`${baseUrl}/identity-store/email/send`, data)
        .then((response) => {
          if (response.status == 201) {
            console.log(response.status);
            setLoading(false);
            setUserNamee('');
            setName('');
            setPhoneNumber('');
            setOpen(true);
          } else {
            setLoading(false);
          }
          console.log(response.status);
          setLoading(false);
        });
    }
    console.log(baseUrl)

  };

  //function to close the dialog Box.
  const closeDialog = () => {
    setOpen(false);
  }


  return (
    <>
      {/* Dialog Box code */}
      <Dialog onClose={handleClose} open={open}>
        <div style={{ width: "70%", margin: "10px" }}>
          <DialogTitle>Deletion request sent successfully!</DialogTitle>
        </div>

        <div style={{ width: "70%", marginTop: "0%", marginBottom: "30px" }}>
          <p style={{ paddingLeft: "30px" }}>
            We have received your request for account deletion.
            Same will be processed in 2-3 business days.
          </p>
        </div>
        <div style={{ width: "70%", marginTop: "0%", marginBottom: "30px" }}>
          <Button style={{ marginLeft: "30px", width: "100px", backgroundColor: "#e6a224" }} variant="contained" onClick={closeDialog}>
            Close

          </Button>
        </div>
      </Dialog>

      {/* Main code for the UI */}
      <div style={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
        <div style={{ width: "100%", height: "10vh", backgroundColor: "white" }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar style={{ backgroundColor: "#ffe3ae" }}>
                <img style={{ width: "200px", height: "70px" }} src={LogoFinal}></img>
              </Toolbar>
            </AppBar>
          </Box>
        </div>

        <div style={{ width: "100%", height: "90vh", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "50%", height: "70vh", backgroundColor: "white", boxShadow: "4px 4px 4px 4px gray" }}>
            <div style={{ width: "100%", height: "10vh", backgroundColor: "#ffe3ae", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h3 style={{ fontSize: "2.5vw" }}> Enter Details for Account Deletion</h3>
            </div>
            <div style={{ width: "100%", height: "60vh", backgroundColor: "white", display: "flex", direction: "column", alignItems: "center", justifyContent: "center" }}>

              <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: "30px" }}>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: '100%',
                  }}
                >
                  <TextField fullWidth onChange={handleChange} value={name} label="Full Name" id="fullWidth" name="name" />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: '100%',
                  }}
                >
                  <TextField onChange={handleChange} fullWidth value={phoneNumber} label="Phone Number*" name="phoneNumber" id="fullWidth" />
                  {phoneValidation && <p style={{ color: "red", marginBottom: "0%", fontSize: "small", paddingLeft: "5px", paddingTop: "5px" }}> Please Enter a valid phone number</p>}

                </Box>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: '100%',
                  }}
                >
                  <TextField onChange={handleChange} fullWidth value={userNamee} label="Username" name="userNamee" id="fullWidth" />
                </Box>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button style={{ width: "200px", backgroundColor: "#e6a224" }} variant="contained" onClick={handleSubmit}>
                    {!loading ? "Submit" : (

                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}

                  </Button>

                  <Toaster position="top-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
