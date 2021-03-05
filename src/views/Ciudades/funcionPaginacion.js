import { useState, useEffect } from 'react';


const usePagination = (initialState) => {
  const { itemsPerPage, ciudades, startFrom } = initialState;
  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(ciudades.length / perPage);
  const pagination = [];
  const [currentPage, setCurrentPage] = useState(startFrom <= pages ? startFrom : 1);
  const [slicedData, setSlicedData] = useState([...ciudades].slice((currentPage - 1) * perPage, currentPage * perPage));

  useEffect(() => {
      setSlicedData([...ciudades].slice((currentPage - 1) * perPage, currentPage * perPage))
  }, [ciudades]);


  
  let ellipsisLeft = false;
  let ellipsisRight = false;
  for(let i = 1; i <= pages; i++) {
    if(i === currentPage) {
      pagination.push(
        { id: i, current: true, ellipsis: false }
      );
    }else {
      if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1 ) {
        pagination.push(
          { id: i, current: false, ellipsis: false }
        );
      }else if( i > 1 && i < currentPage && !ellipsisLeft ) {
        pagination.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisLeft = true;
      }else if( i < pages && i > currentPage && !ellipsisRight) {
        pagination.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisRight = true;
      }
    }
  } 

  const changePage = (page, e) => {
    e.preventDefault();
    if(page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...ciudades].slice((page - 1) * perPage, page * perPage));
    }
  }

  const goToPrevPage = (e) => {
    e.preventDefault();
    setCurrentPage(prevVal => prevVal - 1 === 0 ? prevVal : prevVal - 1);
    if(currentPage !== 1) {
      setSlicedData([...ciudades].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
    }
  }
  
  const goToNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(prevVal => prevVal === pages ? prevVal : prevVal + 1);
    if(currentPage !== pages) {
      setSlicedData([...ciudades].slice(currentPage * perPage, (currentPage + 1) * perPage));
    }
  }

  return {
    slicedData,
    pagination,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage
  };
}

export default usePagination;