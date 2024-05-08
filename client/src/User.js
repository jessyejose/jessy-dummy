import React, { useState, useEffect } from 'react';
import {useNavigate,Link } from 'react-router-dom';


function User() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));



  useEffect(() => {
    fetch('http://localhost:4000/view')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [products]);
  
  const handleLogout=()=>{
	localStorage.removeItem('userDetails');
	navigate('/');
	
  }

  return (
	<>
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#880085', padding: '0 20px' }}>
		<h1 style={{ color: 'white', margin: 0 }}>Welcome {userDetails.name}</h1>
		<button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
	</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {products.map(product => (
        <div key={product._id} style={{ width: '300px', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
			<img src={`http://localhost:4000/${product.Image}`} alt={product.productName} style={{ maxWidth: '100%', height: 'auto' }} />
          <h3>Product Name: {product.productName}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          
		  <Link to="/userinvoice" state={{ id : product}} style={{background: '#880085',color: 'white',padding: '7px',textDecoration: 'none',borderRadius: '5px',display: 'inline-block',marginLeft: '120px'}}>Purchase</Link>
        </div>
      ))}
    </div>
	</>
  );
}

export default User;
