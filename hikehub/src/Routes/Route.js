import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout.js'
import Home from '../Pages/Home/Home.js'
import About from "../Pages/About/About.js";
import Contact from '../Pages/Contact/Contact.js'
import Sign from "../Pages/Sign/Sign.js";
import Events from "../Pages/Events/Events.js";
import Event from "../Pages/EventDetail/Event.js";
import NotFound from "../Pages/404/NotFound.js";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.js";
import Profile from "../Pages/Profile/Profile.js";
import ProtectedRoute from './ProtectedRoutes.js'
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import Stories from '../Pages/Stories/Stories';
import DashRoutes from './DashRoutes.js'
import Overview from '../Pages/Overview/Overview.js'
import Dashboard from '../Pages/Dashboard/Dashboard.js'
import DashSidebar from '../Layout/Sidebar/Sidebar.js'
const Router = () => {
    const { user, checkUser } = useContext(UserContext);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route index path="/about" element={<About />} />
                        <Route index path="/contact" element={<Contact />} />
                        <Route index path="/events" element={<Events />} />
                        <Route index path="/event/:slug" element={<Event />} />
                        <Route index path="/stories" element={<Stories />} />

                        {/* <Route index path="/profile" element={<Profile/>
                    } /> */}
                        <Route
                            element={
                                <ProtectedRoute
                                    isAllowed={user}
                                    redirectPath="/notFound"
                                />
                            }>
                            <Route path="/profile" element={<Profile />} />
                        </Route>

                    </Route>

                    {/*Routes without layout*/}
                    <Route path="/signin" element={<Sign />} />
                    <Route path="/signup" element={<Sign />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />


                    {/* <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} /> */}

                    {/*Protected Routes*/}

                    <Route
                        element={
                            <DashRoutes
                                isAllowed={user && user.role === "organizer"}
                                redirectPath="/unauthorized"
                            />
                        }>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route path="" index element={<Overview />} />
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )



}

export default Router;