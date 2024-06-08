import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { usePost } from '../../Store/PostContext';
import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const { setPostDetals } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        console.log('Error in fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handlePostClick = (product)=>{
    setPostDetals(products)
    navigate(`/viewpost/${product.id}`)
  }

  return (
    <div className="productParentDiv" >
      <div className="quickView">
        <div className="header">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="productCards">
          {products.map(product => (
            <div key={product.id} className="productCard" onClick={()=>handlePostClick(product)}>
              <div className="favoriteIcon">
                <Heart />
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
        <div className="productCards">
          <div className="productCard">
            <div className="favoriteIcon">
              <Heart></Heart>
            </div>
            <div className="productImage">
              <img src="../../../Images/R15V3.jpg" alt="Yamaha R15V3" />
            </div>
            <div className="productContent">
              <p className="price">&#x20B9; 250000</p>
              <span className="category">Two Wheeler</span>
              <p className="productName">YAMAHA R15V3</p>
            </div>
            <div className="datePosted">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
