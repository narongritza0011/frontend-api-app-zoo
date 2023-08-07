import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_Local } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { getDate, formatDate } from "../../../functions/date.js";
import { logout } from "../../../store/userSlice";

const Animals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { userStore } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setToken(userStore.user.token);
      if (token) {
        getAnimals();
      }
    }, 500);
  }, [token]);

  const getAnimals = async () => {
    try {
      const response = await axios.get(`${URL_Local}/api/v1/admin/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      //Unauthorized ให้ login ใหม่
      if (error.response.statusText === "Unauthorized") {
        // console.log(error.response.statusText, "test");
        dispatch(logout());
        navigate("/");
      }
    }
  };

  const deleteAnimal = async (id) => {
    if (id) {
      try {
        const response = await axios.delete(
          `${URL_Local}/api/v1/admin/animals/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data.filter((item) => item._id !== id));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Nav />
      <div className="mx-auto px-10 mt-6">
        <h1 className="text-3xl font-bold">Animals</h1>

        <div className="card-actions justify-end">
          <Link to="/admin/animals/add" className="btn btn-primary">
            Add
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-24 gap:16  justify-items-center ">
            {data
              ? data.map((item) => (
                  <div key={item._id}>
                    <div className="card w-96 bg-base-100 shadow-xl m-6 ">
                      <figure className="h-96 max-h-48 object-cover ">
                        <img
                          src={`${URL_Local}/images/` + item.animal_image}
                          alt="animal"
                        />
                      </figure>
                      <div className="card-body ">
                        <h2 className="card-title">
                          {item.animal_name}

                          {formatDate(item.createdAt) == getDate() ? (
                            <div className="badge badge-secondary">NEW</div>
                          ) : (
                            ""
                          )}

                          <div className="card-actions justify-end">
                            <div className="badge badge-success ">
                              Show duration
                            </div>
                            <div className="badge badge-outline ">
                              {item.animal_show_duration}
                            </div>
                          </div>
                        </h2>
                        <p>{item.animal_species}</p>
                        <p>{item.animal_type}</p>

                        <div className="card-actions justify-end">
                          <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn btn-primary m-1">
                              Manage
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <Link to={(`/admin/animals/`, item._id)}>
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button onClick={() => deleteAnimal(item._id)}>
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        ) : (
          <div className="flex items-start justify-center h-screen">
            <span className="loading loading-spinner text-secondary text-center"></span>
          </div>
        )}

        {!data && (
          <div className="flex items-start justify-center h-screen">
            <p className="text-lg ">not have data to show</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Animals;
