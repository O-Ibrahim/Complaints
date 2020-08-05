import React from "react";

const Complaint = ({ text, status }) => {
  return (
    <div>
      {text} + {status}
    </div>
  );
};
export default Complaint;
