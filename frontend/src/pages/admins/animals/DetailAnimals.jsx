import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import { URL_Local } from "../../../services/api";
import Nav from "../../../components/Nav";
const DetailAnimals = () => {
  const { id } = useParams();
  const { userStore } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  //from data
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [ShowDuration, setShowDuration] = useState(0);
  const [animalImage, setAnimalImage] = useState("");
  const [isActive, setIsActive] = useState(false);
  // const [createdAt, setCreatedAt] = useState("");
  // const [updatedAt, setUpdatedAt] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      getAnimalById(id);
      setToken(userStore.user.token);
    }
  }, [token]);

  const getAnimalById = async () => {
    try {
      const res = await axios.get(`${URL_Local}/api/v1/admin/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setData(res.data);
      setName(res.data.animal_name);
      setSpecies(res.data.animal_species);
      setType(res.data.animal_type);
      setShowDuration(res.data.animal_show_duration);
      setAnimalImage(res.data.animal_image);
      setIsActive(res.data.isActive);
      // setCreatedAt(res.data.createdAt);
      // setUpdatedAt(res.data.updatedAt);
    } catch (error) {
      console.log(error);
    }
  };

  //preview image

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    //set image data to upload
    setImage(e.target.files[0]);
    // const imageNew = e.target.files[0];
    // setImage(imageNew);

    const reader = new FileReader();
    reader.onload = () => {
      // Set the image preview URL or do something with the file contents
      const previewURL = reader.result;
      setPreviewURL(previewURL);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      //กด cancel ตอน choose file
      setPreviewURL("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const formData = new FormData();
        formData.append("animal_name", name);
        formData.append("animal_species", species);
        formData.append("animal_type", type);
        formData.append("animal_show_duration", ShowDuration);
        formData.append("animal_image", animalImage);
        formData.append("isActive", isActive);
        formData.append("image", image);

        // console.log(Object.fromEntries(formData));

        const res = await axios.put(
          `${URL_Local}/api/v1/admin/animals/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.msg);
        navigate("/admin/animals");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Nav />
      <div className="mx-auto px-10 mt-6">
        <h1 className="text-3xl font-bold">Add Animals</h1>
        <div className="grid grid-cols-1  gap-4 my-4">
          <div className="flex flex-col w-full h-screen border-opacity-50  ">
            <div className="grid card bg-base-300 rounded place-items-center  ">
              <form onSubmit={handleSubmit}>
                {!previewURL && animalImage && (
                  <div className="card w-96 bg-base-100 shadow-xl image-full my-4">
                    <figure>
                      <img
                        src={`${URL_Local}/images/` + animalImage}
                        alt="Shoes"
                      />
                    </figure>
                  </div>
                )}
                {previewURL && (
                  <div className="card w-96 bg-base-100 shadow-xl image-full my-4">
                    <figure>
                      <img src={previewURL} alt="Shoes" />
                    </figure>
                  </div>
                )}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                    //   onChange={(e) => setImage(e.target.files[0])}
                    onChange={handleImageChange}
                  />
                  <label className="label">
                    <span className="label-text">Image Old</span>
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    // onChange={(e) =>
                    //   setData({ ...data, image_old: e.target.value })
                    // }
                    // name="animal_name"
                    onChange={(e) => setAnimalImage(e.target.value)}
                    value={animalImage}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                    // name="animal_name"
                    value={name}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Species</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setSpecies(e.target.value)}
                    // name="animal_species"
                    value={species}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setType(e.target.value)}
                    // onChange={(e) =>
                    //   setData({ ...data, animal_type: e.target.value })
                    // }
                    // name="animal_type"
                    value={type}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Show Duration</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    onChange={(e) => setShowDuration(e.target.value)}
                    // name="animal_show_duration"
                    value={ShowDuration}
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className=" label">
                    <span className="label-text">Is Active</span>
                  </label>
                  <input
                    type="checkbox"
                    {...(isActive ? { checked: "checked" } : {})}
                    className="checkbox checkbox-secondary "
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </div>

                <div className="card-actions justify-start my-4">
                  <Link to="/admin/animals" className="btn btn-primary">
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

export default DetailAnimals;
