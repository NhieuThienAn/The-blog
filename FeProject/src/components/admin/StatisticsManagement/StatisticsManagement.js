import React, { useEffect, useState } from 'react';
import { getUserStatistics, getPostStatistics } from '../../../api/api'; // Import API
import Sidebar from '../Sidebar/Sidebar';
import { Card, Col, Row, Typography, Alert, Button, Table } from 'antd'; // Import Ant Design components
import { Bar, Pie } from '@ant-design/charts'; // Import Bar and Pie charts
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx'; // Import XLSX library
import './StatisticsManagement.scss';

const { Title } = Typography;

const StatisticsManagement = () => {
    const [userStats, setUserStats] = useState(null);
    const [adminStats, setAdminStats] = useState(null);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false); // State for showing/hiding the table
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const userResponse = await getUserStatistics(token);
                const adminResponse = await getPostStatistics(token);
                setUserStats(userResponse);
                setAdminStats(adminResponse);
            } catch (error) {
                console.error("Error fetching statistics:", error);
                setError("Failed to load statistics. Please try again later.");
            }
        };

        fetchStatistics();
    }, [token]);

    if (error) {
        return <Alert message={error} type="error" showIcon />;
    }

    // Prepare data for charts
    const postStatusData = adminStats ? adminStats.postsByStatus.map(status => ({
        status: status._id === 'draft' ? 'Bản nháp' : 'Xuất bản',
        count: status.count,
    })) : [];

    const topUsersData = userStats ? userStats.topUsersByPosts.map(user => ({
        username: user.username,
        postCount: user.postCount,
    })) : [];

    const postsByCategoryData = adminStats ? adminStats.postsByCategory.map(category => ({
        categoryName: category.categoryName,
        count: category.count,
    })) : [];

    // Function to export data to Excel
    const exportToExcel = () => {
        const data = [];
        const now = new Date();
        const formattedDate = now.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/\//g, '-').replace(/,/g, '').replace(' ', '_');

        // Add User Stats Header
        data.push(["Tổng số người dùng", userStats?.totalUsers]);
        data.push(["Tổng số bài viết", userStats?.totalPosts]);
        data.push(["Số người dùng đã đăng ký nhận thông báo", userStats?.subscribedUsersCount]);
        data.push([""]); // Empty row for spacing

        // Add Top Users Header
        data.push(["Người dùng", "Số bài viết"]);
        topUsersData.forEach(user => {
            data.push([user.username, user.postCount]);
        });
        data.push([""]); // Empty row for spacing

        // Add Post Status Header
        data.push(["Trạng thái", "Số lượng"]);
        postStatusData.forEach(status => {
            data.push([status.status, status.count]);
        });
        data.push([""]); // Empty row for spacing

        // Add Posts by Category Header
        data.push(["Danh mục", "Số lượng"]);
        postsByCategoryData.forEach(category => {
            data.push([category.categoryName, category.count]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Set header style to bold
        const headerCellStyle = { font: { bold: true } };
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_col(col) + 1; // Row 1 for headers
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = headerCellStyle; // Apply bold style
            }
        }

        // Auto-size columns
        const colWidths = data[0].map(() => ({ wpx: 0 })); // Initialize widths
        data.forEach(row => {
            row.forEach((cell, i) => {
                const cellLength = String(cell).length * 10; // Approximate width
                if (cellLength > colWidths[i].wpx) {
                    colWidths[i].wpx = cellLength; // Update max width
                }
            });
        });

        worksheet['!cols'] = colWidths; // Set column widths

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistics");

        // Export the workbook with the current date and time in the filename
        XLSX.writeFile(workbook, `Statistics_${formattedDate}.xlsx`);
    };

    // Columns for the statistics table
    const columns = [
        {
            title: 'Thống kê',
            dataIndex: 'statistic',
            key: 'statistic',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    // Data for the statistics table
    const tableData = [
        { key: '1', statistic: 'Tổng số người dùng', value: userStats?.totalUsers },
        { key: '2', statistic: 'Tổng số bài viết', value: userStats?.totalPosts },
        { key: '3', statistic: 'Số người dùng đã đăng ký nhận thông báo', value: userStats?.subscribedUsersCount },
        { key: '4', statistic: 'Top người dùng có nhiều bài viết nhất', value: topUsersData.map(user => `${user.username}: ${user.postCount}`).join(', ') },
        { key: '5', statistic: 'Trạng thái bài viết', value: postStatusData.map(status => `${status.status}: ${status.count}`).join(', ') },
        { key: '6', statistic: 'Bài viết theo danh mục', value: postsByCategoryData.map(category => `${category.categoryName}: ${category.count}`).join(', ') },
    ];

    return (
        <div className="statistics-management-container">
            <Sidebar />
            <div className="content">
                <Title level={2}>Thống kê</Title>
                <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '16px' }}>
                    Xuất Excel
                </Button>
                <Button
                    type="default"
                    onClick={() => setShowTable(!showTable)}
                    style={{ marginBottom: '16px', marginLeft: '8px' }}
                >
                    {showTable ? 'Ẩn Thống kê' : 'Hiện Thống kê'}
                </Button>
                {showTable && (
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                        bordered
                    />
                )}
                <div className='margin-top'>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Thống kê Người dùng">
                                <Bar
                                    data={topUsersData}
                                    xField="username"
                                    yField="postCount"
                                    title="Top người dùng có nhiều bài viết nhất"
                                    label={{
                                        position: 'top',
                                        style: { fill: '#000000' }
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Thống kê Bài viết theo Trạng thái">
                                <Pie
                                    data={postStatusData}
                                    angleField="count"
                                    colorField="status"
                                    title="Số lượng bài viết theo trạng thái"
                                    label={{
                                        content: '{name}: {percentage}',
                                    }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Số lượng Bài viết theo Danh mục">
                                <Bar
                                    data={postsByCategoryData}
                                    xField="categoryName"
                                    yField="count"
                                    title="Bài viết theo danh mục"
                                    label={{
                                        position: 'top',
                                        style: { fill: '#000000' }
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Thông tin Người dùng">
                                <ul>
                                    <li>Tổng số người dùng: {userStats?.totalUsers}</li>
                                    <li>Tổng số bài viết: {userStats?.totalPosts}</li>
                                    <li>Số người dùng đã đăng ký nhận thông báo: {userStats?.subscribedUsersCount}</li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default StatisticsManagement;