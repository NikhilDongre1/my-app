'use client';
import { useEffect, useState } from "react";
import "./globals.css";
import Image from "next/image";

const PAGE_SIZE = 7;

export default function Home() {

  const [response, setResponse] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  
  
  const fetchData = async()=>{
    try{
      const data = await fetch('https://dummyjson.com/products');
      const response =  await data.json();
      setResponse(response);
      
    }
    catch(error){
      setErrorMessage(`Failed to load data: ${error}`);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  const products = response?.products;
  const productLength = response?.products.length;
  const noOfPages = Math.ceil(productLength /PAGE_SIZE);
  const productsToShow = products?.slice(currentPage* PAGE_SIZE,((currentPage* PAGE_SIZE)+PAGE_SIZE));
  

if (errorMessage){
  return (
    <div className="App">
      <h1>Api failed </h1>
      <h2>{errorMessage}</h2>
      </div>
  );
}


  return isNaN(productLength) ||  productLength == 0 ? 
  
  (    <h1>Loading... </h1>):(
    <div className="App">
      <h1>Pagination </h1>
      <div className="pagination-container">

      {[...Array(noOfPages).keys()].map((n)=>{
        return (
          <div className="pagination-buttons" onClick={()=>setCurrentPage(n)}>{n+1}</div>
        );
      })}
      </div>
      
        <div className="main">
        {productsToShow?.map((item,index)=>{
          return (
            <div key={index} className="product">
            <Image src={item.thumbnail} alt="image" width={100} height={100} />
            <h6>{item.title}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
