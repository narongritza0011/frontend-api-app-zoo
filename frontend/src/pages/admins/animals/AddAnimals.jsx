import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_Local } from "../../../services/api";
import { useSelector } from "react-redux";

const AddAnimals = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [ShowDuration, setShowDuration] = useState(0);
  const [image, setImage] = useState(null);
  const { userStore } = useSelector((state) => ({ ...state }));
  const [token, setToken] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  //preview image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //set image data to upload
    setImage(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      // Set the image preview URL or do something with the file contents
      const previewURL = reader.result;
      setPreviewURL(previewURL);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setToken(userStore.user.token);
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("animal_name", name);
    formData.append("animal_species", species);
    formData.append("animal_type", type);
    formData.append("animal_show_duration", ShowDuration);
    formData.append("image", image);
    // console.log(Object.fromEntries(formData));

    if (token) {
      try {
        await axios.post(`${URL_Local}/api/v1/admin/animals`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
                {image && (
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
                    // onChange={(e) => setImage(e.target.files[0])}
                    onChange={handleImageChange}
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
                    name="animal_name"
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
                    name="animal_species"
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
                    name="animal_type"
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
                    name="animal_show_duration"
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

export default AddAnimals;
