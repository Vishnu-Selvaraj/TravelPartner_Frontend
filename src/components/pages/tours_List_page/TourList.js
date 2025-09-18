import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

import img5 from "../../../images/bali img2.jpg";
import Card from '../../card/Card';
import Footer from '../Landing_pages/footer/Footer';
import Banner from '../single_banner/Banner';
import Navbar from '../../Navbar/Navbar';
import Search from '../../search/Search';
import CheckAuth from '../../auth/ChechAuth/CheckAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import './TourList.css'
import { Axios } from '../../../axiosInstance/AxiosInstance';


function TourList() {

  const [tourData,setTourData] = useState([])
  const [filteredData,setFilteredData] = useState([])
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('userToken'))

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const fetchData = async()=>{

    var options = {
      headers:{
        Authorization:`Token ${token}`
      }
    }
    try{
      const response = await Axios.get('get-all-tour-list',options)
      console.log(response.data.data)
      setTourData(response.data.data)
      setFilteredData(response.data.data)
     }catch(error){
      if(error.response.data.blocked_error){
        toast.error(error.response.data.blocked_error,{style:{
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          fontWeight:'400',
          color: '#111',
        }})
        localStorage.removeItem('userToken')
        navigate('/login')
      }
      console.log(error)
     }
  }

  useEffect(()=>{
    if(token){
      fetchData()
    }else{
      console.log('server error')
    }
  },[])

  const handleSearch = (searchTerm)=>{
    if(searchTerm.trim() === ''){
      setFilteredData(tourData)
    }else{
      var dataRelatedToSearchTerm = tourData.filter((data)=> data.place_name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredData(dataRelatedToSearchTerm)
    }
  }

  return (
    <div id='TourListBody'>
        <Navbar homepageData = {tourData}/>
        <Search  handleSearch = {handleSearch} isTourListComponent = {true}/>
        {/* ============================ Banner Component ===================== */}

        <Banner bannerImg = {img5} title = {'All Tours'}/>

        {/* ============================ Card Component ===================== */}

        <div className="container mt-1">
            <Card TourData={filteredData}/>
        </div>
        {/* ============================ Pagination Component ===================== */}
        {/* <Pagination data = {filteredData}/> */}
        
        {/* ============================ Pagination Component ===================== */}

        {/* ============================ Footer Component ===================== */}

        <div className="container-fluid mt-5" id='footerBody'>
        <Footer/>
        </div>
    </div>
  )
}
export default CheckAuth(TourList);