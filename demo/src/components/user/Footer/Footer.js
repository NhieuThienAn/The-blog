<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2021 My Website. All rights reserved.</p>

            <ul className="social-media-links">
                <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
            </ul>

            <div className="footer-links">
                <p><Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
                <p>
                    <Link to="/contact">Contact Us</Link> |
                    <Link to="/about">About Us</Link> |
                    <Link to="/faq">FAQ</Link> |
                    <Link to="/blog">Blog</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
=======
// src/components/Footer/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import './Footer.scss';

const { Text } = Typography;
const { Footer } = Layout;

const FooterComponent = () => {
    const facebook = "https://www.facebook.com/people/Nguy%E1%BB%85n-Minh/pfbid02cvE43uioqDwbCKHb2u5uk8YVERaXLkaUQEBfo6nkUJ951bCJ3fPXfkHDt32F7LuZl/";
    const instagram = "https://www.instagram.com/nta09.08/profilecard/?igsh=MW5ocDRtMzh5eWxrYw==";
    const email = "mailto:hhyu03096@gmail.com"; // Sửa đổi để sử dụng mailto
    const linkedin = "https://www.linkedin.com/in/thi%C3%AAn-an-undefined-47a57b342/";

    return (
        <Footer style={{ backgroundColor: '#f0f2f5', padding: '20px 0' }}>
            <Row justify="space-between" align="middle">
                <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Text>© 2021 My Website. All rights reserved.</Text>
                </Col>

                <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Space size="large">
                        <a href={facebook} target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined style={{ fontSize: '20px' }} />
                        </a>
                        <a href={email} target="_blank" rel="noopener noreferrer">
                            <MailOutlined style={{ fontSize: '20px' }} />
                        </a>
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined style={{ fontSize: '20px' }} />
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined style={{ fontSize: '20px' }} />
                        </a>
                    </Space>
                </Col>

                <Col span={24} style={{ textAlign: 'center' }}>
                    <Text>
                        <Link to="/privacy">Privacy Policy</Link> |
                        <Link to="/terms"> Terms of Service</Link>
                    </Text>
                    <br />
                    <Text>
                        <Link to="/contact">Contact Us</Link> |
                        <Link to="/about"> About Us</Link> |
                        <Link to="/faq"> FAQ</Link> |
                        <Link to="/posts"> Blog</Link>
                    </Text>
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterComponent;
>>>>>>> 086163e (74% done)
