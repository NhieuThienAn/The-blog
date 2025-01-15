import React, { useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Loading.scss'; 

const { Title } = Typography;

const Loading = () => {
    return (
        <div className="loading-container">
            <Spin size="large" tip="Đang tải..."/>
            <Title level={3} style={{ marginTop: 20 }}>Xin chờ một chút...</Title>
        </div>
    );
};

export default Loading;