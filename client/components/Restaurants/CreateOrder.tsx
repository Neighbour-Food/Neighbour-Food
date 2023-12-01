import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { setCreateOrderTab, setOrderScreen, setOrderInput, setOrderData, setIsLoading, setImgFile } from "../../state/user/userSlice";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import IMG3 from '../../../assets/IMG3';
import IsLoading from "../IsLoading";


const CreateOrder: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState(null);
  // const [signedUrl, setSignedUrl] = useState(null);

  const username = useSelector((state: RootState) => state.user.username);
  // const username = 'Michael';
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const createOrderTab = useSelector((state: RootState) => state.user.createOrderTab);
  const orderScreen = useSelector((state: RootState) => state.user.orderScreen);
  // const orderScreen = 'order-form' || '';
  // const imgFile = useSelector((state: RootState) => state.user.imgFile);
  const orderInput = useSelector((state: RootState) => state.user.orderInput);
  const orderData = useSelector((state: RootState) => state.user.orderData);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);



  // function to switch between categories on click
  const handleTab = (event: any) => { /// H E L P
    dispatch(setCreateOrderTab(event.target.value));
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target

    dispatch(setOrderInput(
      { ...orderInput, [name]: value }
    ))
    console.log('orderInput :', orderInput)
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    console.log('selectedFile: ', selectedFile)
    // dispatch(setImgFile(selectedFile));
    setImgFile(selectedFile)
  };

  const handleCancel = (event: any) => {
    dispatch(setOrderData([]));
  }

  const handleAddItem = (event: any) => {
    console.log('orderInput :', orderInput)
    dispatch(setOrderData([...orderData, orderInput]))
  }

  const handleUpload = async (event: any) => {
    event.preventDefault();
    dispatch(setIsLoading());
    

    if (!imgFile) {
      console.error('No image selected');
      // return;
    }

    try {
      // server req for signed url
      const signedUrlResponse = await axios.post('http://localhost:4000/generate-signed-url', {
        fileName: imgFile,
      });

      const { signedUrl } = signedUrlResponse.data;

      // Upload the image using the signed URL
      await axios.put(signedUrl, imgFile, {
        headers: {
          'Content-Type': imgFile.type,
        },
      });

      console.log('Image uploaded successfully');
    } catch (error) {
      // alert('File not uploaded')
      console.error('Error uploading file:', error.message);
    }

    try {
      // server req for posting meal
      console.log('orderData :', orderData)
      const request: any = await axios.post('http://localhost:4000/api/meals/postMeal', {
        orderData
      });

      if (request.data.status === 'success') {
        navigate("/create-order")
        dispatch(setIsLoading());
        dispatch(setCreateOrderTab('history'))
      } else {
        alert('please enter all information')
      }

    }
    catch (err) {
      console.log('error: ', err)
    }
  };

  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>)
  } else return (
    <>
      <div className="signup">
        <Sidebar />
        <section className="hero">
          <nav >
            <button type='button' value='entry' className={`${createOrderTab === 'entry' ? 'red' : ''}`} onClick={handleTab}>FOOD ENTRY</button>
            <button type='button' value='history' className={`${createOrderTab === 'history' ? 'red' : ''}`} onClick={handleTab} >HISTORY</button>
          </nav>

          {createOrderTab === 'entry' && orderScreen === '' ? (
            <div className="column">
              <h2>Hi <span className="red">{username}</span>, <br></br> CREATE A<br></br>  PICK UP</h2>
              <IMG3 />
              <button type='button' value='lets-go' className={`black-button`} onClick={() => dispatch(setOrderScreen('order-form'))}>LET"S GO</button>
            </div>

          ) : createOrderTab === 'entry' && orderScreen === 'order-form' ? (
            <>
              <form onSubmit={handleUpload}>
                <h2></h2>
                <label htmlFor="pick-up-time">Pick up time</label>
                <input type="text" name="pick-up-time" onChange={handleInputChange} className="border-bottom" />
                <div className="add-bottom-border"></div>
                <div className="food-item">
                  <label htmlFor="food-item">Food item #1</label>
                  <input type="text" name="food-item" onChange={handleInputChange} className="border-bottom" />
                  <label htmlFor="img-upload">Upload image</label>
                  <input type="file" name="img-upload" onChange={handleFileChange} className="border-bottom" />
                  <label htmlFor="instructions">Special instructions</label>
                  <input type="text" name="instructions" onChange={handleInputChange} className="border-bottom" />
                </div>
                {orderData.map((order, index) => {
                  return (
                    <div className="food-item" key={index}>
                      <label htmlFor="food-item">Food item #{index + 2}</label>
                      <input type="text" name="food-item" onChange={handleInputChange} className="border-bottom" />
                      <label htmlFor="img-upload">Upload image</label>
                      <input type="file" name="img-upload" onChange={handleFileChange} className="border-bottom" />
                      <label htmlFor="instructions">Special instructions</label>
                      <input type="text" name="instructions" onChange={handleInputChange} className="border-bottom" />
                    </div>
                  )
                })}
                <button className="white-button" type="button" onClick={handleAddItem}>ADD ITEM</button>
                <div className="buttons">
                  <button className="white-button" type="button" onClick={handleCancel}>Cancel</button>
                  <button className="black-button" type="submit">Post</button>
                </div>
              </form>
            </>
          ) : (

            <h1 style={{padding: '300px'}}>History</h1>
          )}

        </section>
      </div>
    </>
  )
};

export default CreateOrder;