import React, { useCallback, useEffect, useState } from 'react';
import './Create.css';
import Header from '../HeaderFooter/Header';
import { storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth();
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState({});
  const [error, setError] = useState({
    productName: '',
    place: '',
    description: '',
    category: '',
    price: ''
  });


  const checkError = useCallback((name, value) => {
    switch (name) {
      case 'productName':
        if (value.trim().length === 0) setError((prevErrors) => ({ ...prevErrors, productName: "Product name is required" }));
        else setError((prevErrors) => ({ ...prevErrors, productName: "" }));
        break;
      case 'place':
        if (value.trim().length === 0) setError((prevErrors) => ({ ...prevErrors, place: "Place is required" }));
        else setError((prevErrors) => ({ ...prevErrors, place: "" }));
        break;
      case 'description':
        if (value.trim().length === 0) setError((prevErrors) => ({ ...prevErrors, description: "Description is required" }));
        else setError((prevErrors) => ({ ...prevErrors, description: "" }));
        break;
      case 'category':
        if (value.trim().length === 0) setError((prevErrors) => ({ ...prevErrors, category: "Category is required" }));
        else setError((prevErrors) => ({ ...prevErrors, category: "" }));
        break;
      case 'price':
        if (value.trim().length === 0) setError((prevErrors) => ({ ...prevErrors, price: "Price is required" }));
        else setError((prevErrors) => ({ ...prevErrors, price: "" }));
        break;
      default:
        setError({
          productName: '',
          place: '',
          description: '',
          category: '',
          price: ''
        });
        break;
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
    switch (name) {
      case 'productName':
        setProductName(value);
        checkError(name, value);
        break;
      case 'place':
        setPlace(value);
        checkError(name, value);
        break;
      case 'description':
        setDescription(value);
        checkError(name, value);
        break;
      case 'category':
        setCategory(value);
        checkError(name, value);
        break;
      case 'price':
        setPrice(value);
        checkError(name, value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!error.category && !error.description && !error.productName && !error.place && !error.price && category.length > 0 && place.length > 0 && place.length > 0 && productName.length > 0 && image.length > 0) {
        setCategory('')
        setDescription('')
        setProductName('')
        setPlace('')
        setPrice('')
        setImage('')

        const storageRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload paused");
                break;
              case "running":
                console.log("Upload running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
              setImages((prev) => ({ ...prev, img: downloadedURL }));
              console.log(images);
            });
          }
        );
      } else {
        toast.error("Please Fill the Form");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <form>
            <label htmlFor="productName">Product Name &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '11px' }}>
                {error.productName ? `(${error.productName})` : ''}
              </span>
            </label>
            <br />
            <input
              className="createInput"
              type="text"
              required
              id="productName"
              name="productName"
              value={productName}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="place">Place &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '11px' }}>
                {error.place ? `(${error.place})` : ''}
              </span>
            </label>
            <br />
            <input
              className="createInput"
              type="text"
              id="place"
              required
              name="place"
              value={place}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="description">Description &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '11px' }}>
                {error.description ? `(${error.description})` : ''}
              </span>
            </label>
            <br />
            <input
              className="createInput"
              type="text"
              id="description"
              required
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="category">Category &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '11px' }}>
                {error.category ? `(${error.category})` : ''}
              </span>
            </label>
            <br />
            <input
              className="createInput"
              type="text"
              id="category"
              name="category"
              value={category}
              required
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="price">Price &nbsp;&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '11px' }}>
                {error.price ? `(${error.price})` : ''}
              </span>
            </label>
            <br />
            <input
              className="createInput"
              required
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" required />
            <br />
            <button className="uploadBtn" type='submit' onClick={handleSubmit}>Upload and Submit</button>

          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
