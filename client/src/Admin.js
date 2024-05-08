import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';


function Admin() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/add-product', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Product added successfully');
        setProductName('');
        setDescription('');
        setPrice('');
        setImage(null);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleLogout=()=>{
	navigate('/');
	
  }

  return (
	<>
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#880085', padding: '0 20px' }}>
		<h1 style={{ color: 'white', margin: 0 }}>Welcome Admin</h1>
		<button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
	</div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #880085', borderRadius: '5px' ,marginTop:"-150px"}}>
        <h2>Add Product</h2>
        <label>Product Name</label>
        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}/>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}/>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}/>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} style={{ width: '100%', marginBottom: '10px' }}/>
        <button type="button" style={{ backgroundColor: '#880085', color: 'white', width: '30%', padding: '10px', border: 'none', borderRadius: '5px', marginLeft: '100px' }} onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
	</>
  );
}

export default Admin;
