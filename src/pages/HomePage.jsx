import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="">
        <h1 className="text-primary mt-3 mx-auto">Mi agenda Online</h1>
        <button
          className="btn btn-primary btn-lg mt-5"
          onClick={() => navigate("/login")}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default HomePage;
