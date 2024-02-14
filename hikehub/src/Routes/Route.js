import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout.js'
import Home from '../Pages/Home/Home.js'
import About from "../Pages/About/About.js";
import Contact from '../Pages/Contact/Contact.js'
import Sign from "../Pages/Sign/Sign.js";
import Events from "../Pages/Events/Events.js";
const Router = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route index path="/about" element={<About/>} />
                    <Route index path="/contact" element={<Contact/> } />
                    <Route index path="/events" element={<Events/> } />

                </Route>

{/*Routes without layout*/}
<Route path="/sign" element={<Sign/> } />

                {/* <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} /> */}

{/*Protected Routes*/}

                {/* <Route
                    element={
                        <ProtectedRoute
                            isAllowed={user && user.role === "admin"}
                            redirectPath="/unauthorized"
                        />
                    }>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="" index element={<Overview />} />
                        <Route path="category" index element={<CategoryTable />} />
                    </Route>
                </Route> */}

            </Routes>
        </BrowserRouter>
    </div>
    )
   


}

export default Router;