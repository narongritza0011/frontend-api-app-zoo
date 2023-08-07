import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_Local, } from "../../../services/api";
import { useSelector } from "react-redux";

const AddStage = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [seat, setSeat] = useState("");
  const [amount, setAmount] = useState("");
  const { userStore } = useSelector((state) => ({ ...state }));
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(userStore.user.token);
  }, [token]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("room", room);
    formData.append("seat", seat);
    formData.append("amount", amount);
    // console.log(Object.fromEntries(formData));
    if (token) {
      try {
        await axios.post(`${URL_Local}/api/v1/admin/stages`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        navigate("/admin/stages");
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <>
      <Nav />
      <div className="mx-auto px-10 mt-6">
        <h1 className="text-3xl font-bold">Add Stage</h1>
        <div className="grid grid-cols-1  gap-4 my-4">
          <div className="flex flex-col w-full h-screen border-opacity-50  ">
            <div className="grid card bg-base-300 rounded place-items-center  ">
              <form onSubmit={handleSubmit}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Room</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setRoom(e.target.value)}
                    name="room"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Seat</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setSeat(e.target.value)}
                    name="seat"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Amout</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setAmount(e.target.value)}
                    name="amount"
                  />
                </div>

                <div className="card-actions justify-start my-4">
                  <Link to="/admin/stages" className="btn btn-primary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStage;
