import React, { useEffect, useState } from 'react';
import { Flex, Progress, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const [progress, setprogress] = useState(0); // Thanh tiến trình thứ hai
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setprogress((prev) => Math.max(prev + 1, 100));

            // Khi cả hai thanh tiến trình đạt 100, chuyển hướng
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100); // Tăng mỗi 100ms

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [navigate, progress]);

    return (
        <Flex
            wrap
            gap="middle"
            style={{
                marginTop: 16,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Progress
                type="circle"
                percent={progress}
                trailColor="rgba(0, 0, 0, 0.06)"
                strokeWidth={23}
                style={{ width: 200 }}
            />
        </Flex>
    );
};

export default Loading;