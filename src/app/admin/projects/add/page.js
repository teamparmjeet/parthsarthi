"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import slugify from "slugify";
import dynamic from "next/dynamic";
import Image from "next/image";
// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable SSR for this component
});
import 'react-quill/dist/quill.snow.css';

export default function Page() {
  // State to store form data
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    title: "",
    slug: "",
    content: "",
    location: "",

    projectSize: [{ size: "", image: [] }],
    bhk: [{ bhk: "", image: [] }],

    isFeatured: "false",
    propertyType: "",
    possessionStatus: "",
    AvailablePlot: "",
    map: "",
    logo: "",
    image: "",
    gallery: "",
    sitePlan: "",
    pdf: "",
    seoTitle: "",
    seoDescription: ""
  });

  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [category, setCategory] = useState([])


  useEffect(() => {
    const alldata = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategory(response.data.data);
      } catch (error) {
        console.error('Error fetching data data:', error);
      } finally {
        setLoading(false);
      }
    };

    alldata();
  }, []);
  // Handle input change
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "category") {
      // Handle the checkbox (multiple categories)
      setFormData((prev) => {
        const updatedCategories = checked
          ? [...prev.category, value]  // Add the selected category
          : prev.category.filter((id) => id !== value);  // Remove the unselected category

        return {
          ...prev,
          [name]: updatedCategories,  // Update the category array
        };
      });
    } else {
      // Handle other fields (boolean or standard input)
      const booleanFields = ["isFeatured"]; // List of fields that should be boolean
      setFormData((prev) => ({
        ...prev,
        [name]: booleanFields.includes(name) ? value === "true" : value,
      }));
    }

    // Generate slug for title field
    if (name === "title") {
      generateUniqueSlug(value);
    }
  };



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (e.target.name === 'image') {
      // For single image
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (e.target.name === 'logo') {
      // For single logo
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    }
    else if (e.target.name === 'gallery') {
      // For multiple images
      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...files],
      }));
    } else if (e.target.name === 'sitePlan') {
      // For site plan
      setFormData((prev) => ({ ...prev, sitePlan: files[0] }));
    }
    else if (e.target.name === 'pdf') {
      // For site plan
      setFormData((prev) => ({ ...prev, pdf: files[0] }));
    }
  };


  // Function to generate a unique slug
  const generateUniqueSlug = async (title) => {
    if (!title) return;

    // Generate slug using slugify
    let newSlug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists in the database
    try {
      const { data } = await axios.get(`/api/projects/check-slug/${newSlug}`);

      // If slug exists, append suffix until it's unique
      let suffix = 1;
      if (data.success) {
        newSlug = `${slugify(title, { lower: true, strict: true })}-${suffix}`;
        const { data: newCheck } = await axios.get(`/api/projects/check-slug/${newSlug}`);

        suffix++;
      }

      // Update slug in the form data
      setFormData((prevState) => ({ ...prevState, slug: newSlug }));
    } catch (err) {
      console.error("Error generating slug", err);
    }
  };

  // Validate form
  useEffect(() => {
    setIsFormValid(!!formData.title && !!formData.slug && !!formData.category && !!formData.price && !!formData.content && !!formData.location);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;
      let logoUrl = formData.logo;
      let galleryUrls = [];
      let sitePlanUrl = "";


      // Handle single image upload
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.image);
        const uploadResponse = await axios.post("/api/upload", formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadResponse.data.file.secure_url;
      }

      if (formData.logo) {
        const formDatalogo = new FormData();
        formDatalogo.append("file", formData.logo);
        const uploadResponse = await axios.post("/api/upload", formDatalogo, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        logoUrl = uploadResponse.data.file.secure_url;
      }


      // Handle multiple gallery images upload concurrently
      if (formData.gallery.length > 0) {
        const uploadPromises = formData.gallery.map((file) => {
          const formDataGallery = new FormData();
          formDataGallery.append("file", file);
          return axios.post("/api/upload", formDataGallery, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        });

        // Resolve all uploads and collect URLs
        const uploadResponses = await Promise.all(uploadPromises);
        galleryUrls = uploadResponses.map((res) => res.data.file.secure_url);
      }

      // Handle site plan upload
      if (formData.sitePlan) {
        const formDataSitePlan = new FormData();
        formDataSitePlan.append("file", formData.sitePlan);
        const sitePlanResponse = await axios.post("/api/upload", formDataSitePlan, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        sitePlanUrl = sitePlanResponse.data.file.secure_url;
      }


      // Submit updated data
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        logo: logoUrl,
        gallery: galleryUrls, // Array of uploaded URLs
        sitePlan: sitePlanUrl, // Add the site plan URL

      };

      const response = await axios.post("/api/projects/create", updatedFormData);
      if (response.status === 200) {
        toast.success("Project successfully created!");
        setFormData({
          category: "",
          price: "",
          title: "",
          slug: "",
          content: "",
          location: "",
          projectSize: [{ size: "", image: [] }],
          bhk: [{ bhk: "", image: [] }],
          isFeatured: "",
          propertyType: "",
          possessionStatus: "",
          AvailablePlot: "",
          map: "",
          logo: "",
          image: "",
          gallery: [],
          sitePlan: "",
          pdf: "",
          seoTitle: "",
          seoDescription: ""
        }); // Reset form
      } else {
        toast.error("Failed to create project! Unexpected status code.");
      }
    } catch (err) {
      console.error("Failed to create project:", err.response?.data || err.message);
      toast.error(`Failed to create project: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Handle change for bhk input
  const handleBHKChange = (e, index) => {
    const updatedBHK = [...formData.bhk];
    updatedBHK[index].bhk = e.target.value;
    setFormData({ ...formData, bhk: updatedBHK });
  };

  // Handle change for projectSize input
  const handleProjectSizeChange = (e, index) => {
    const updatedProjectSize = [...formData.projectSize];
    updatedProjectSize[index].size = e.target.value;
    setFormData({ ...formData, projectSize: updatedProjectSize });
  };

  // Add a new bhk entry
  const addBHK = () => {
    setFormData({
      ...formData,
      bhk: [...formData.bhk, { bhk: '', image: [] }],
    });
  };

  // Add a new projectSize entry
  const addProjectSize = () => {
    setFormData({
      ...formData,
      projectSize: [...formData.projectSize, { size: '', image: [] }],
    });
  };

  // Remove a specific bhk entry
  const removeBHK = (index) => {
    const updatedBHK = formData.bhk.filter((_, i) => i !== index);
    setFormData({ ...formData, bhk: updatedBHK });
  };

  // Remove a specific projectSize entry
  const removeProjectSize = (index) => {
    const updatedProjectSize = formData.projectSize.filter((_, i) => i !== index);
    setFormData({ ...formData, projectSize: updatedProjectSize });
  };

  const handleEditorChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  return (
    <div className="container lg:w-[90%] mx-auto py-5">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-3">
          <Link href={'/admin/projects'}>
            <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
              <ArrowLeft size={16} className='me-1' /> All Projects
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
          <h1 className="text-lg font-bold">Add New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">

          <div className=" grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">

              <div className="grid grid-cols-12 gap-4">
                {/* Title */}
                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="title" className="block text-[12px] text-gray-700">
                    Title <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Title"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                {/* Slug (Read-Only Field) */}
                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="slug" className="block text-[12px] text-gray-700">
                    Slug <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Enter Page Slug"
                    className="block w-full px-2 py-2 text-gray-500 bg-gray-100 border border-gray-200 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="seoTitle" className="block text-[12px] text-gray-700">
                    Seo Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="Enter Page Seo Title"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="seoDescription" className="block text-[12px] text-gray-700">
                    Seo Description
                  </label>
                  <input
                    type="text"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    placeholder="Enter Page Seo Description"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>


                <div className="col-span-12">
                  <label htmlFor="location" className="block text-[12px] text-gray-700">
                    Location <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location (use Embed code)"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                <div className="col-span-12">
                  <label htmlFor="map" className="block text-[12px] text-gray-700">
                    Map (use Embed code)
                  </label>
                  <input
                    type="text"
                    name="map"
                    value={formData.map}
                    onChange={handleChange}
                    placeholder="Map (use Embed code)"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>


                <div className="col-span-12">

                  <div className="col-span-12">
                    <label htmlFor="pdf" className="block text-[12px] text-gray-700">
                      Brochure (use Link)
                    </label>
                    <input
                      type="text"
                      name="pdf"
                      value={formData.pdf}
                      onChange={handleChange}
                      placeholder="Pdf (use Link)"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />
                  </div>
                </div>


                {/* Content */}
                <div className="col-span-12">
                  <label htmlFor="content" className="block text-[12px] text-gray-700">
                    Content <span className=" text-red-600">*</span>
                  </label>
                  <ReactQuill theme="snow" className=" h-44 mb-10" value={formData.content} onChange={(value) => handleEditorChange('content', value)} />
                </div>

                <div className="col-span-12">
                  <label htmlFor="logo" className="block text-[12px] text-gray-700">
                    Logo Image
                  </label>

                  {formData.logo ? (
                    <div className="relative group">
                      <Image
                        src={URL.createObjectURL(formData.logo)}
                        alt="Feature Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="logo/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload an logo
                      </label>

                    </div>
                  )}
                </div>




                {/* Feature Image */}
                <div className="col-span-12">
                  <label htmlFor="image" className="block text-[12px] text-gray-700">
                    Feature Image
                  </label>

                  {formData.image ? (
                    <div className="relative group">
                      <Image
                        src={URL.createObjectURL(formData.image)}
                        alt="Feature Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload an image
                      </label>

                    </div>
                  )}
                </div>


                <div className="col-span-12">
                  <label htmlFor="gallery" className="block text-[12px] text-gray-700">
                    Gallery Images
                  </label>

                  {formData.gallery && formData.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.gallery.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Gallery Preview ${index + 1}`}
                            height={100}
                            width={100}
                            className="w-full h-40 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, i) => i !== index),
                              }))
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="gallery"
                        name="gallery"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                      />
                      <label
                        htmlFor="gallery"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload Gallery Images
                      </label>
                    </div>
                  )}
                </div>



                <div className="col-span-12">
                  <label htmlFor="sitePlan" className="block text-[12px] text-gray-700">
                    Site Plan
                  </label>

                  {formData.sitePlan ? (
                    <div className="relative group">
                      <Image
                        src={URL.createObjectURL(formData.sitePlan)}
                        alt="Feature Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, sitePlan: "" }))}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="sitePlan"
                        name="sitePlan"
                        accept="application/pdf,image/*" // Adjust MIME types as needed
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="sitePlan"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload a Site Plan
                      </label>
                    </div>
                  )}
                </div>








              </div>
            </div>
            <div className="lg:col-span-1 gap-4 flex flex-col">


              <div>
                {formData.bhk.map((bhkItem, index) => (
                  <div key={`bhk-${index}`} className="sm:col-span-6 col-span-12">
                    <label htmlFor={`bhk-${index}`} className="block text-[12px] text-gray-700">
                      BHK
                    </label>
                    <input
                      type="number"
                      name={`bhk-${index}`}
                      value={bhkItem.bhk}
                      onChange={(e) => handleBHKChange(e, index)}
                      placeholder="Enter Bhk"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />
                    {formData.bhk.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBHK(index)}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove BHK
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBHK}
                  className="text-blue-500 text-xs mt-2"
                >
                  Add More BHK
                </button>
              </div>

              <div>
                {/* Project Size Inputs */}
                {formData.projectSize.map((projectSizeItem, index) => (
                  <div key={`projectSize-${index}`} className="sm:col-span-6 col-span-12">
                    <label htmlFor={`projectSize-${index}`} className="block text-[12px] text-gray-700">
                      Project Size
                    </label>
                    <input
                      type="number"
                      name={`projectSize-${index}`}
                      value={projectSizeItem.size}
                      onChange={(e) => handleProjectSizeChange(e, index)}
                      placeholder="Enter Project Size"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />
                    {formData.projectSize.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProjectSize(index)}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove Project Size
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProjectSize}
                  className="text-blue-500 text-xs mt-2"
                >
                  Add More Project Size
                </button>
              </div>


              <div className="col-span-12">
                <label htmlFor="possessionStatus" className="block text-[12px] text-gray-700">
                  Possession Status <span className=" text-red-600">*</span>
                </label>
                <select
                  name="possessionStatus"
                  value={formData.possessionStatus}
                  onChange={handleChange}
                  className="block w-full px-2 py-2 text-gray-500  border border-gray-200 sm:text-sm"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Possession Offered">Possession Offered</option>

                </select>
              </div>


              <div className="col-span-12">
                <label htmlFor="category" className="block text-[12px] text-gray-700">
                  Category <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2 bg-gray-100 p-2 rounded-md">
                  {category.map((cat) => (
                    <div key={cat._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${cat._id}`}
                        name="category"
                        value={cat._id}
                        checked={formData.category.includes(cat._id)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${cat._id}`} className="text-xs text-gray-600">
                        {cat.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>




              <div className="col-span-12">
                <label htmlFor="propertyType" className="block text-[12px] text-gray-700">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="block w-full px-2 py-2 text-gray-500  border border-gray-200 sm:text-sm"
                >
                  <option value="" disabled>Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div className="sm:col-span-6 col-span-12">
                <label htmlFor="price" className="block text-[12px] text-gray-700">
                  Price <span className=" text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                />
              </div>


              <div className="col-span-12">
                <label htmlFor="isFeatured" className="block text-[12px] text-gray-700">
                  Is Featured <span className=" text-red-600">*</span>
                </label>
                <label className="flex items-center text-gray-500 sm:text-sm">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="true" // String "true"
                    checked={formData.isFeatured === true}
                    onChange={handleChange}
                    className="text-blue-500 border-gray-200 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center text-gray-500 sm:text-sm">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="false" // String "false"
                    checked={formData.isFeatured === false}
                    onChange={handleChange}
                    className="text-blue-500 border-gray-200 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>

              </div>





              <div className="sm:col-span-6 col-span-12">
                <label htmlFor="AvailablePlot" className="block text-[12px] text-gray-700">
                  Available Plot
                </label>
                <input
                  type="number"
                  name="AvailablePlot"
                  value={formData.AvailablePlot}
                  onChange={handleChange}
                  placeholder="Available Plot Number"
                  className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                />
              </div>



            </div>
          </div>
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`${!isFormValid || loading ? "bg-gray-400" : "bg-[#29234b]"} text-white w-full font-bold py-2 px-4 rounded-md`}
            >
              {loading ? "Submitting..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
