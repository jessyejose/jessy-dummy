// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';


// function Userinvoice() {
//     const location = useLocation();
// 	const navigate=useNavigate();
// 	const userDetails = JSON.parse(localStorage.getItem('userDetails'));

// console.log(location.state)
// const handleLogout=()=>{
// 	localStorage.removeItem('userDetails');
// 	navigate('/');
	
//   }
//   return (
// 	<>
// 	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#880085', padding: '0 20px' }}>
// 		<h1 style={{ color: 'white', margin: 0 }}>Welcome {userDetails.name}</h1>
// 		<button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
// 	</div>
// 	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <div style={{ width: '300px', padding: '20px', border: '1px solid #880085', borderRadius: '5px' }}>


// 	  </div>
// 	</div>
	  
// 	</>
//   )
// }

// export default Userinvoice



import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Userinvoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  const product = location.state.id;
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#880085', padding: '0 20px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Welcome {userDetails.name}</h1>
        <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #880085', borderRadius: '5px' }}>
          <h2>Product Details</h2>
		  <img src={`http://localhost:4000/${product.Image}`} alt={product.productName} style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Product Id: {product._id}</p>
          <p>Product Name: {product.productName}</p>
          <p>Description: {product.description}</p>
          <p>Amount Paid: ${product.price}</p>
          <button onClick={handlePrint}>Print</button>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <h2>Product Details</h2>
		  <img src={`http://localhost:4000/${product.Image}`} alt={product.productName} style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Product Id: {product._id}</p>
          <p>Product Name: {product.productName}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
        </div>
      </div>
    </>
  );
}

export default Userinvoice;
