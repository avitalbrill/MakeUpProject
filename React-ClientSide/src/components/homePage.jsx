import {  useState } from "react"
import React from "react"
import { useEffect } from 'react'

import ServiceStore from "../makeUp/service";
import { observer } from 'mobx-react-lite'

// import Login from "./login";
import LoginAdmin from "./loginAdmin";
import Bar from "./bar"
import ServiceList from "./serviceList";
import SignForm from './paper'

const HomePage = (observer(() => {

  // const [identity, setId] = useState(0)


  const [login, setLogin] = useState(false);
  const [services, setServices] = useState([]);
  useEffect(() => {
    ServiceStore.getServices().then((result) => {
      setServices(result)
      console.log(result) // "Some desired value"
    })
  }, []);

  return (<>
    <Bar></Bar><br /><br />
    {/* <SignForm ></SignForm> */}

    {login && <LoginAdmin></LoginAdmin>}
    {console.log("services", services)}
    <ServiceList/>

  </>)
}))

export default HomePage