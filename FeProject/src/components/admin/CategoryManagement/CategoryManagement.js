import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, notification } from 'antd';
import { getAllCategories, deleteCategory, createCategory, updateCategory } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './CategoryManagement.scss';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategories();
            setCategories(response.data);
        };

        fetchCategories();
        const intervalComment = setInterval(fetchCategories, 1000);
        return () => clearInterval(intervalComment);
    }, []);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await deleteCategory(categoryId);
                setCategories(categories.filter(category => category._id !== categoryId));
                notification.success({ message: 'Category deleted successfully!' });
            } catch (error) {
                notification.error({ message: 'Failed to delete category.' });
            }
        }
    };

    const handleCreate = async () => {
        if (!newCategory) return;
        try {
            const response = await createCategory({ name: newCategory });
            setCategories([...categories, response.data]);
            setNewCategory('');
            notification.success({ message: 'Category created successfully!' });
        } catch (error) {
            console.log(error);
            notification.error({ message: 'Failed to create category.' });
        }
    };

    const handleEdit = async () => {
        if (!editingCategoryName) return;
        try {
            const response = await updateCategory(editingCategory, { name: editingCategoryName });
            setCategories(categories.map(cat => (cat._id === editingCategory ? response.data : cat)));
            setEditingCategory(null);
            setEditingCategoryName('');
            notification.success({ message: 'Category updated successfully!' });
        } catch (error) {
            notification.error({ message: 'Failed to update category.' });
        }
    };

    const columns = [
        {
            title: 'Tên Danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => {
                        setEditingCategory(record._id);
                        setEditingCategoryName(record.name);
                    }}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Xóa</Button>
                </>
            ),
        },
    ];

    const paginatedCategories = categories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="category-management-container">
            <Sidebar />
            <div className="content">
                <h2>Quản lý Danh mục</h2>
                <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Thêm danh mục mới"
                    style={{ marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleCreate}>Thêm</Button>

                <Table
                    dataSource={paginatedCategories}
                    columns={columns}
                    rowKey="_id"
                    style={{ marginTop: '20px' }}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: categories.length,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />

                <Modal
                    title="Sửa Danh mục"
                    visible={!!editingCategory}
                    onOk={handleEdit}
                    onCancel={() => setEditingCategory(null)}
                >
                    <Input
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        placeholder="Tên danh mục"
                    />
                </Modal>
            </div>
        </div>
    );
};

export default CategoryManagement;