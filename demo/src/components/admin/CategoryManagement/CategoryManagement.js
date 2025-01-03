import React, { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../../../api/api'; // Đường dẫn tới file API
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../admin/Sidebar/Sidebar'; // Import Sidebar
import './CategoryManagement.scss'; // Import CSS cho component

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(); // Gọi API để lấy danh sách danh mục
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories. Please try again later.");
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await deleteCategory(categoryId); // Gọi API để xóa danh mục
                setCategories(categories.filter(category => category._id !== categoryId)); // Cập nhật danh sách danh mục
            } catch (error) {
                console.error("Error deleting category:", error);
                setError("Failed to delete category. Please try again later.");
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="category-management-container">
            <Sidebar />
            <div className="content">
                <h2>Quản lý Danh mục</h2>
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Tên Danh mục</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/categories/${category._id}`)}>Chi tiết</button>
                                    <button onClick={() => handleDelete(category._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryManagement;