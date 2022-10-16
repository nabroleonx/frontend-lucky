import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function VisionBoard() {
  const [files, setFiles] = useState([]);
  const [previews, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesURL, setImagesURL] = useState([]);
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setPreview(
      files.map((file) =>
        Object.assign(file, {
          previews: URL.createObjectURL(file),
        })
      )
    );
  }, [files]);

  const upload = (e) => {
    e.preventDefault();
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tcojxvly");

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/nabroleon/image/upload`,
          formData
        )
        .then((res) => {
          setImagesURL((prevState) => [...prevState, res.data.secure_url]);
        });
    });

    axios.all(uploaders).then(console.log(imagesURL));
  };

  useEffect(() => {
    if (imagesURL.length === 3) {
      axios.post("http://localhost:5000/api/goal", {
        img1: imagesURL[0],
        img2: imagesURL[1],
        img3: imagesURL[2],
        duration: duration,
        amount: amount,
      });
    }
  }, [imagesURL]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setPreview(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            previews: URL.createObjectURL(file),
          })
        )
      );
    },
    multiple: true,
  });

  const handleX = (bb) => {
    const newFiles = files.filter((file) => file.path !== bb);
    setFiles(newFiles);
  };

  const previ = previews.map((file) => {
    return (
      <div
        className="mt-1 flex py-1 px-1 space-x-3 border border-gray-300 rounded-md"
        key={file.name}
      >
        <img
          className="h-20 w-20 object-cover rounded-sm cursor-pointer"
          // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          src={file.previews}
          alt=""
        />
        <div className="relative w-full rounded-lg flex items-center overflow-hidden space-x-3">
          <div className="flex-1 min-w-0">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500 truncate">
              {(file.size / 1024).toFixed(1)} Kb
            </p>
          </div>
          <div className="absolute flex  ml-auto right-0 pr-4 items-center">
            <span
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={() => handleX(file.name)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="px-2">
      <form
        onSubmit={upload}
        className="flex flex-col justify-center items-center h-screen gap-3"
      >
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              id="price"
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
              aria-describedby="price-currency"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                USD
              </span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CalendarDaysIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="number"
              name="duration"
              id="duration"
              onChange={(e) => setDuration(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 pr-8 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="enter in years"
            />
          </div>
        </div>
        <div className="border-gray-500">
          <div
            className="mt-1 flex justify-center px-40 py-20 border-2 border-gray-300 border-dashed rounded-md"
            {...getRootProps()}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    name="file-upload"
                    onChange={(e) => {
                      setFiles(e.target.value);
                    }}
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {previ}
        </div>
        <div className="pt-5">
          <div className="">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border-transparent border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:indigo-400"
            >
              {loading ? (
                <div className=" flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-l-2 border-b-2 border-indigo-400"></div>
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
