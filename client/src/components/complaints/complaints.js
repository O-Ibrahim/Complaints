import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const Complaints = async () => {
  let [complaints, setComplaints] = useState([]);
  useEffect(async () => {
    // async function fetchData() {
    //   try {

    //   } catch (err) {}
    // }
    // fetchData();
    let complaintsfromApi = await api.get("/complaint/");
    setComplaints([...complaintsfromApi.data]);
  }, []);

  return <div>asd</div>;
};

export default Complaints;
