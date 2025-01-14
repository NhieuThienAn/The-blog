import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, notification } from 'antd';
import { getAllTags, deleteTag, createTag, updateTag } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../admin/Sidebar/Sidebar';
import './TagManagement.scss';

const TagManagement = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [editingTag, setEditingTag] = useState(null);
    const [editingTagName, setEditingTagName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllTags();
            setTags(response.data);
        };

        fetchTags();
        const intervalComment = setInterval(fetchTags, 1000);
        return () => clearInterval(intervalComment);
    }, []);

    const handleDelete = async (tagId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
        if (confirmDelete) {
            try {
                await deleteTag(tagId);
                setTags(tags.filter(tag => tag._id !== tagId));
                notification.success({ message: 'Tag deleted successfully!' });
            } catch (error) {
                notification.error({ message: 'Failed to delete tag.' });
            }
        }
    };

    const handleCreate = async () => {
        if (!newTag) return;
        try {
            const response = await createTag({ name: newTag });
            setTags([...tags, response.data]);
            setNewTag('');
            notification.success({ message: 'Tag created successfully!' });
        } catch (error) {
            notification.error({ message: 'Failed to create tag.' });
        }
    };

    const handleEdit = async () => {
        if (!editingTagName) return;
        try {
            const response = await updateTag(editingTag, { name: editingTagName });
            setTags(tags.map(t => (t._id === editingTag ? response.data : t)));
            setEditingTag(null);
            setEditingTagName('');
            notification.success({ message: 'Tag updated successfully!' });
        } catch (error) {
            notification.error({ message: 'Failed to update tag.' });
        }
    };

    const columns = [
        {
            title: 'Tên Thẻ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => {
                        setEditingTag(record._id);
                        setEditingTagName(record.name);
                    }}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div className="tag-management-container">
            <Sidebar />
            <div className="content">
                <h2>Quản lý Thẻ</h2>
                <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Thêm thẻ mới"
                    style={{ marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleCreate}>Thêm</Button>

                <Table
                    dataSource={tags}
                    columns={columns}
                    rowKey="_id"
                    style={{ marginTop: '20px' }}
                />

                <Modal
                    title="Sửa Thẻ"
                    visible={!!editingTag}
                    onOk={handleEdit}
                    onCancel={() => setEditingTag(null)}
                >
                    <Input
                        value={editingTagName}
                        onChange={(e) => setEditingTagName(e.target.value)}
                        placeholder="Tên thẻ"
                    />
                </Modal>
            </div>
        </div>
    );
};

export default TagManagement;