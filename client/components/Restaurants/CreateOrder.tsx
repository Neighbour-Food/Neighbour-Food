import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { setCreateOrderTab, setOrderScreen, setImgFile } from "../../state/user/userSlice";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import IMG3 from '../../../assets/IMG3'

const CreateOrder: FC = () => {
  const dispatch = useDispatch();

  // const username = useSelector((state: RootState) => state.user.username);
  const username = 'Michael';
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const createOrderTab = useSelector((state: RootState) => state.user.createOrderTab);
  // const orderScreen = useSelector((state: RootState) => state.user.orderScreen);
  const orderScreen = 'order-form' || '';
  const imgFile = useSelector((state: RootState) => state.user.imgFile);
  

  // function to switch between categories on click
  const handleTab = (event: any) => { /// H E L P
    dispatch(setCreateOrderTab(event.target.value));
  };

  const handleInputChange = (event: any) => { /// H E L P
    // dispatch to order reducer
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    dispatch(setImgFile(selectedFile));
  };

  const handleUpload = () => {
    if (!imgFile) {
      console.error('No image selected');
      return;
    }
    console.log('imgFile: ', imgFile)

    // server req for signed url
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: imgFile }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { signedUrl, fileName } = data;
        fetch(signedUrl, {
          method: 'PUT',
          body: imgFile,
          headers: {
            'Content-Type': imgFile.type,
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log('Image uploaded successfully');
            } else {
              console.error('Failed to upload file:', response.statusText);
            }
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      })
      .catch((error) => {
        console.error('Error getting signed URL:', error);
      });
  };

  return (
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
                  <label htmlFor="food-item">Food item</label>
                  <input type="text" name="food-item" onChange={handleInputChange} className="border-bottom" />
                  <label htmlFor="img-upload">Upload image</label>
                  <input type="file" name="img-upload" onChange={handleFileChange} className="border-bottom" />
                  <label htmlFor="instructions">Special instructions</label>
                  <input type="text" name="instructions" onChange={handleInputChange} className="border-bottom" />
                </div>
                <button className="white-button" type="submit" >ADD ITEM</button>
              </form>
            </>
          ) : (

            <div>History</div>
          )}

        </section>
      </div>
    </>
  )
};

export default CreateOrder;
