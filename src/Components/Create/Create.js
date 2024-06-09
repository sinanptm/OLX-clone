import React, { useEffect, useState, useCallback } from 'react';
import './Create.css';
import Header from '../HeaderFooter/Header';
import { db, storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useAuth } from '../../Store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    productName: '',
    place: '',
    description: '',
    category: '',
    price: '',
    image: null,
  });
  // eslint-disable-next-line
  const [images, setImages] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // eslint-disable-next-line 
  const validateInput = useCallback(
    debounce((name, value) => {
      let error = '';

      if (!value.trim()) {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      } else if (value.length < 2) {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be more than 2 characters`;
      }

      if (name === 'price') {
        if (isNaN(value)) {
          error = 'Price must be a number';
        } else if (value <= 0) {
          error = 'Price must be greater than zero';
        }
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }, 300), []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateInput(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    } else {
      toast.error('Please upload a valid image file');
      setFormData((prevData) => ({ ...prevData, image: null }));
      document.getElementById('image').value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, place, description, category, price, image } = formData;

    if (Object.values(errors).some((error) => error) || !productName || !place || !description || !category || !price || !image) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
          toast.error("Image upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadedURL) => {
            setImages((prev) => ({ ...prev, img: downloadedURL }));
            console.log("Image Uploaded : " + downloadedURL);

            await addDoc(collection(db, 'products'), {
              place,
              description,
              category,
              price,
              name: productName,
              image: downloadedURL,
              userId: user.uid,
              createdAt: new Date().toDateString(),
            });

            toast.success("Product created successfully");
            setFormData({
              productName: '',
              place: '',
              description: '',
              category: '',
              price: '',
              image: null,
            });
            document.getElementById('image').value = '';
          });
        }
      );

    } catch (error) {
      console.log(error);
      toast.error("Form submission failed");
    }
  };

  const { image } = formData;

  return (
    <>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            {['productName', 'place', 'description', 'category', 'price'].map((field) => (
              <div key={field}>
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <span style={{ color: 'red', fontSize: '11px' }}>
                    {errors[field] ? `(${errors[field]})` : ''}
                  </span>
                </label>
                <br />
                <input
                  className="createInput"
                  type={field === 'price' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                <br />
              </div>
            ))}
            <label htmlFor="image">Image</label>
            <br />
            <input type="file" id="image" onChange={handleFileChange} required />
            <br />
            {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} />}
            <br />
            <button className="uploadBtn" type="submit">Upload and Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
