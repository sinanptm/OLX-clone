import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Spinner } from '../../assets/Spinner';
import { usePost } from '../../Provider/PostContext';

import './View.css';

function View() {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const { id } = useParams();
  const { postDetails } = usePost();
  
  const fetchSeller = async (userId) => {
    try {
      const sellerDoc = await getDoc(doc(db, 'users', userId));
      if (sellerDoc.exists()) {
        setSeller(sellerDoc.data());
      } else {
        console.log('No such seller!');
      }
    } catch (error) {
      console.log('Error fetching seller:', error);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    const fetchProduct = async () => {
      try {

        if (postDetails) {
          setProduct(postDetails);
          await fetchSeller(postDetails.userId);
        } else {
          const productDoc = await getDoc(doc(db, 'products', id));
          if (productDoc.exists()) {
            const productData = productDoc.data();
            setProduct(productData);
            await fetchSeller(productData.userId);
          } else {
            console.log('No such product!');
          }
        }

      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);


  if (!product) return <Spinner />

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{new Date(product.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller ? seller.userName : 'No name'}</p>
          <p>{seller ? seller.phone : 'No phone number'}</p>
          <p>{seller ? seller.email : 'No Email'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;