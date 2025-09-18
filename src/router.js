import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TourList from "./components/pages/tours_List_page/TourList";
import TourView from "./components/pages/tour_view_page/TourView";
import UserProfile from "./components/pages/User_profile/UserProfile";
import BookingConfirmation from "./components/pages/Booking_confimation_page/BookingConfirmation";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";

const router = createBrowserRouter([
    {path:'',element:<App/>},
    {path:'/signup',element:<Signup/>},
    {path:'/login',element:<Login/>},
    {path:'tourList',element:<TourList/>},
    {path:'/tour-view-page/:tourId',element:<TourView/>},
    {path:'/tour-user-profile/:activepage',element:<UserProfile/>},
    {path:'/tour-booking-confirmation/:tour_id',element:<BookingConfirmation/>},



]);

export default router;