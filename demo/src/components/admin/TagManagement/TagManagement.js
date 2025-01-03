import React, { useEffect, useState } from 'react';
import { getAllTags, deleteTag } from '../../../api/api'; // Đường dẫn tới file API
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../admin/Sidebar/Sidebar'; // Import Sidebar
import './TagManagement.scss'; // Import CSS cho component

const TagManagement = () => {
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAllTags(); // Gọi API để lấy danh sách thẻ
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
                setError("Failed to load tags. Please try again later.");
            }
        };

        fetchTags();
    }, []);

    const handleDelete = async (tagId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
        if (confirmDelete) {
            try {
                await deleteTag(tagId); // Gọi API để xóa thẻ
                setTags(tags.filter(tag => tag._id !== tagId)); // Cập nhật danh sách thẻ
            } catch (error) {
                console.error("Error deleting tag:", error);
                setError("Failed to delete tag. Please try again later.");
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="tag-management-container">
            <Sidebar />
            <div className="content">
                <h2>Quản lý Thẻ</h2>
                <table className="tag-table">
                    <thead>
                        <tr>
                            <th>Tên Thẻ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map(tag => (
                            <tr key={tag._id}>
                                <td>{tag.name}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/tags/${tag._id}`)}>Chi tiết</button>
                                    <button onClick={() => handleDelete(tag._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TagManagement;