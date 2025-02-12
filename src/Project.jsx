import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./host"; // Import API URL

const COMMON_IMAGE_URL = "./sathyabama.png"; // Replace with your common image URL

function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/get`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => window.open(project.link, "_blank")}
          >
            <img
              src={COMMON_IMAGE_URL}
              alt="Project"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2 text-center">{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
