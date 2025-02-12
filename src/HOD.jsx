import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./host";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Button, Input } from "antd";

function HOD() {
  const [adminData, setAdminData] = useState({ email: "", password: "", role: "teacher" });
  const [projectData, setProjectData] = useState({ title: "", link: "" });
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/get`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/register`, adminData);
      alert("Admin added successfully!");
      setAdminData({ email: "", password: "", role: "teacher" });
    } catch (error) {
      alert("Error adding admin");
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProject) {
        await axios.put(`${API_BASE_URL}/projects/update/${editProject._id}`, projectData);
        alert("Project updated successfully!");
        setEditProject(null);
      } else {
        await axios.post(`${API_BASE_URL}/projects/post`, projectData);
        alert("Project added successfully!");
      }
      setProjectData({ title: "", link: "" });
      fetchProjects();
    } catch (error) {
      alert("Error adding/updating project");
    }
  };

  const showEditModal = (project) => {
    setProjectData({ title: project.title, link: project.link });
    setEditProject(project);
    setIsEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      await axios.put(`${API_BASE_URL}/projects/update/${editProject._id}`, projectData);
      alert("Project updated successfully!");
      fetchProjects();
    } catch (error) {
      alert("Error updating project");
    }
    setIsEditModalVisible(false);
  };

  const showDeleteModal = (project) => {
    setSelectedProject(project);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/delete/${selectedProject._id}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
    }
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}>
      <h1 className="text-3xl font-bold text-white px-6 py-2 rounded-lg mb-6">HOD Dashboard</h1>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Admin Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Add Admin</h2>
          <form className="flex flex-col" onSubmit={handleAdminSubmit}>
            <label className="font-medium">Email</label>
            <input type="email" placeholder="Enter admin email"
              className="mt-1 mb-3 p-2 border rounded-lg" value={adminData.email}
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} required />

            <label className="font-medium">Password</label>
            <input type="password" placeholder="Enter password"
              className="mt-1 mb-3 p-2 border rounded-lg" value={adminData.password}
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} required />

            <label className="font-medium">Role</label>
            <select className="mt-1 mb-3 p-2 border rounded-lg" value={adminData.role}
              onChange={(e) => setAdminData({ ...adminData, role: e.target.value })}>
              <option value="teacher">Teacher</option>
              <option value="hod">HOD</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add Admin
            </button>
          </form>
        </div>

        {/* Add/Edit Project Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-xl font-bold mb-4">Add Project</h2>
  <form className="flex flex-col" onSubmit={handleProjectSubmit}>
    <label className="font-medium">Project Title</label>
    <input
      type="text"
      placeholder="Enter project title"
      className="mt-1 mb-3 p-2 border rounded-lg"
      value={projectData.title}
      onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
      required
    />

    <label className="font-medium">Project Link</label>
    <input
      type="text"
      placeholder="Enter project link"
      className="mt-1 mb-3 p-2 border rounded-lg"
      value={projectData.link}
      onChange={(e) => setProjectData({ ...projectData, link: e.target.value })}
      required
    />

    <button type="submit" className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
      Add Project
    </button>
  </form>
</div>
</div>

      {/* Project List Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-5xl">
        <h2 className="text-xl font-bold mb-4">Project List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Link</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="border border-gray-300 px-4 py-2">{project.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item onClick={() => showEditModal(project)}>Edit</Menu.Item>
                      <Menu.Item onClick={() => showDeleteModal(project)}>Delete</Menu.Item>
                    </Menu>
                  } trigger={['click']}>
                    <MoreOutlined className="cursor-pointer text-xl" />
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <Modal title="Edit Project" open={isEditModalVisible} onOk={handleEditOk} onCancel={() => setIsEditModalVisible(false)}>
        <Input value={projectData.title} onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} />
        <Input value={projectData.link} onChange={(e) => setProjectData({ ...projectData, link: e.target.value })} />
      </Modal>

      <Modal title="Confirm Delete" open={isDeleteModalVisible} onOk={handleDeleteOk} onCancel={() => setIsDeleteModalVisible(false)}>
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </div>
  );
}

export default HOD;
