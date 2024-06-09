import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { usePost } from '../../Store/PostContext';
import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});
  const { setPostDetals } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        // Initialize likes state
        const initialLikes = {};
        productsList.forEach(product => {
          initialLikes[product.id] = false;
        });
        setLikes(initialLikes);
      } catch (error) {
        console.log('Error in fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handlePostClick = (product) => {
    setPostDetals(product);
    navigate(`/viewpost/${product.id}`);
  };

  const handleLike = (productId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [productId]: !prevLikes[productId]
    }));
  };

  return (
    <div className="productParentDiv">
      <div className="quickView">
        <div className="header">
          <span>Quick Menu</span>
          <span></span>
        </div>
        <div className="productCards">
          {products.map((product) => (
            <div key={product.id} className="productCard" onClick={() => handlePostClick(product)}>
              <div className="favoriteIcon" onClick={(e) => { e.stopPropagation(); handleLike(product.id); }}>
                <Heart liked={likes[product.id]} />
              </div>
              <div className="productImage">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="productContent">
                <p className="price">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="productName">{product.name}</p>
              </div>
              <div className="datePosted">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="header">
          <span>Fresh recommendations</span>
        </div>
        <div className="recommendationsGrid">
          {products.map((product) => (
            <div key={product.id} className="productCard" onClick={() => handlePostClick(product)}>
              <div className="favoriteIcon" onClick={(e) => { e.stopPropagation(); handleLike(product.id); }}>
                <Heart liked={likes[product.id]} />
              </div>
              <div className="productImage">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="productContent">
                <p className="price">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="productName">{product.name}</p>
              </div>
              <div className="datePosted">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;