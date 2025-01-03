// src/components/About/About.js

import React from 'react';
<<<<<<< HEAD
import './About.scss';
import AboutImage from '../../../assets/images/hinh-nen-may-tinh-4k-don-gian-ma-dep-chill.jpg'; // Cập nhật đường dẫn

const About = () => {
    return (
        <div className="about-container">
            <img className='about-image' src={AboutImage} alt='Trang web Đăng bài' />

            <h1 className="about-title">Giới thiệu về Chúng tôi</h1>
            <p className="about-welcome">
                Chào mừng bạn đến với <strong>Trang web Đăng bài</strong> - nơi mọi người có thể chia sẻ ý tưởng,
                câu chuyện và quan điểm của mình với cộng đồng. Chúng tôi tạo ra một nền tảng mở, nơi mà
                mọi người có thể dễ dàng đăng bài viết và tham gia vào các cuộc thảo luận.
            </p>

            <h2 className="about-philosophy">Triết lý của chúng tôi</h2>
            <p className="about-philosophy-description">
                Chúng tôi tin rằng mọi câu chuyện đều xứng đáng được nghe. Mỗi người đều có những trải nghiệm
                và quan điểm độc đáo, và chúng tôi muốn tạo ra một không gian an toàn và thân thiện cho mọi người
                để chia sẻ.
            </p>

            <h2 className="about-features">Các tính năng nổi bật</h2>
            <ul className="about-features-list">
                <li className="about-feature-item"><strong>Đăng bài dễ dàng:</strong> Bạn có thể nhanh chóng đăng bài viết chỉ với vài bước đơn giản.</li>
                <li className="about-feature-item"><strong>Thảo luận tích cực:</strong> Tham gia vào các cuộc thảo luận và bình luận về bài viết của người khác.</li>
                <li className="about-feature-item"><strong>Chia sẻ và kết nối:</strong> Kết nối với những người có cùng sở thích và quan điểm.</li>
            </ul>

            <h2 className="about-why-choose">Tại sao chọn chúng tôi?</h2>
            <p className="about-why-choose-description">
                Chúng tôi cam kết xây dựng một cộng đồng hỗ trợ và tích cực. Với các công cụ quản lý nội dung
                và bình luận thân thiện, chúng tôi muốn đảm bảo rằng trải nghiệm của bạn trên trang web là thoải mái
                và an toàn.
            </p>

            <h2 className="about-contact">Kết nối với chúng tôi</h2>
            <p className="about-contact-info">Nếu bạn có bất kỳ câu hỏi nào hoặc muốn biết thêm thông tin, đừng ngần ngại liên hệ với chúng tôi qua:</p>
            <ul className="about-contact-list">
                <li className="about-contact-item">Email: <a href="https://mail.google.com/mail/u/0/?fs=1&to=hhyu03096@gmail.com&tf=cm" className="about-link">hhyu03096@gmail.com</a></li>
                <li className="about-contact-item">Facebook: <a href="https://www.facebook.com/people/Nguy%E1%BB%85n-Minh/pfbid02cvE43uioqDwbCKHb2u5uk8YVERaXLkaUQEBfo6nkUJ951bCJ3fPXfkHDt32F7LuZl/" className="about-link" target="_blank" rel="noopener noreferrer">Nguyen Minh</a></li>
                <li className="about-contact-item">Instagram: <a href="https://www.instagram.com/nta09.08/profilecard/?igsh=MW5ocDRtMzh5eWxrYw==" className="about-link" target="_blank" rel="noopener noreferrer">twitter.com/example</a></li>
            </ul>
=======
import { Typography, List, Image } from 'antd';
import './About.scss';
import AboutImage from '../../../assets/images/hinh-nen-may-tinh-4k-don-gian-ma-dep-chill.jpg'; // Cập nhật đường dẫn

const { Title, Paragraph } = Typography;

const About = () => {
    const contactList = [
        {
            title: 'Email',
            link: 'https://mail.google.com/mail/u/0/?fs=1&to=hhyu03096@gmail.com&tf=cm',
            text: 'hhyu03096@gmail.com'
        },
        {
            title: 'Facebook',
            link: 'https://www.facebook.com/people/Nguy%E1%BB%85n-Minh/pfbid02cvE43uioqDwbCKHb2u5uk8YVERaXLkaUQEBfo6nkUJ951bCJ3fPXfkHDt32F7LuZl/',
            text: 'Nguyen Minh'
        },
        {
            title: 'Instagram',
            link: 'https://www.instagram.com/nta09.08/profilecard/?igsh=MW5ocDRtMzh5eWxrYw==',
            text: 'Instagram.com/example'
        }
    ];

    return (
        <div className="about-container">
            <Image className='about-image' src={AboutImage} alt='Trang web Đăng bài' />

            <Title level={1}>Giới thiệu về Chúng tôi</Title>
            <Paragraph>
                Chào mừng bạn đến với <strong>Trang web Đăng bài</strong> - nơi mọi người có thể chia sẻ ý tưởng,
                câu chuyện và quan điểm của mình với cộng đồng. Chúng tôi tạo ra một nền tảng mở, nơi mà
                mọi người có thể dễ dàng đăng bài viết và tham gia vào các cuộc thảo luận.
            </Paragraph>

            <Title level={2}>Triết lý của chúng tôi</Title>
            <Paragraph>
                Chúng tôi tin rằng mọi câu chuyện đều xứng đáng được nghe. Mỗi người đều có những trải nghiệm
                và quan điểm độc đáo, và chúng tôi muốn tạo ra một không gian an toàn và thân thiện cho mọi người
                để chia sẻ.
            </Paragraph>

            <Title level={2}>Các tính năng nổi bật</Title>
            <List
                dataSource={[
                    { title: 'Đăng bài dễ dàng:', description: 'Bạn có thể nhanh chóng đăng bài viết chỉ với vài bước đơn giản.' },
                    { title: 'Thảo luận tích cực:', description: 'Tham gia vào các cuộc thảo luận và bình luận về bài viết của người khác.' },
                    { title: 'Chia sẻ và kết nối:', description: 'Kết nối với những người có cùng sở thích và quan điểm.' },
                ]}
                renderItem={item => (
                    <List.Item>
                        <strong>{item.title}</strong> {item.description}
                    </List.Item>
                )}
            />

            <Title level={2}>Tại sao chọn chúng tôi?</Title>
            <Paragraph>
                Chúng tôi cam kết xây dựng một cộng đồng hỗ trợ và tích cực. Với các công cụ quản lý nội dung
                và bình luận thân thiện, chúng tôi muốn đảm bảo rằng trải nghiệm của bạn trên trang web là thoải mái
                và an toàn.
            </Paragraph>

            <Title level={2}>Kết nối với chúng tôi</Title>
            <Paragraph>
                Nếu bạn có bất kỳ câu hỏi nào hoặc muốn biết thêm thông tin, đừng ngần ngại liên hệ với chúng tôi qua:
            </Paragraph>
            <List
                dataSource={contactList}
                renderItem={item => (
                    <List.Item>
                        {item.title}: <a href={item.link} className="about-link" target="_blank" rel="noopener noreferrer">{item.text}</a>
                    </List.Item>
                )}
            />
>>>>>>> 086163e (74% done)
        </div>
    );
};

export default About;