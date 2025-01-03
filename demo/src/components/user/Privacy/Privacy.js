import React from 'react';
import { Layout, Typography, Divider, Space } from 'antd';
import './Privacy.scss';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const PrivacyPolicy = () => {
    return (
        <Layout>
            <Header style={{}}>
                <Title level={1} style={{ color: '#333', margin: 0, textAlign: 'center' }}>Chính Sách Quyền Riêng Tư</Title>
            </Header>
            <Content style={{ padding: '80px 20px 20px', background: '#f0f2f5' }}>
                <div className="privacy-container">
                    <Title level={3}>1. Giới thiệu</Title>
                    <Paragraph>
                        Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn truy cập vào blog của chúng tôi.
                    </Paragraph>

                    <Divider dashed />

                    <Title level={3}>2. Thông tin chúng tôi thu thập</Title>
                    <Paragraph>
                        Chúng tôi có thể thu thập thông tin cá nhân của bạn khi bạn:
                    </Paragraph>
                    <ul>
                        <li>Đăng ký tài khoản.</li>
                        <li>Gửi bình luận hoặc phản hồi.</li>
                        <li>Tham gia vào các cuộc khảo sát hoặc chương trình khuyến mãi.</li>
                    </ul>

                    <Divider dashed />

                    <Title level={3}>3. Cách chúng tôi sử dụng thông tin</Title>
                    <Paragraph>
                        Chúng tôi có thể sử dụng thông tin mà chúng tôi thu thập để:
                    </Paragraph>
                    <ul>
                        <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi.</li>
                        <li>Gửi thông tin và cập nhật đến bạn.</li>
                        <li>Phân tích cách bạn sử dụng dịch vụ để cải thiện trải nghiệm người dùng.</li>
                    </ul>

                    <Divider dashed />

                    <Title level={3}>4. Bảo mật thông tin</Title>
                    <Paragraph>
                        Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi sự truy cập, sử dụng hoặc tiết lộ trái phép.
                    </Paragraph>

                    <Divider dashed />

                    <Title level={3}>5. Quyền của bạn</Title>
                    <Paragraph>
                        Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của bạn bất cứ lúc nào. Nếu bạn có bất kỳ câu hỏi nào về quyền riêng tư của bạn, hãy liên hệ với chúng tôi.
                    </Paragraph>

                    <Divider dashed />

                    <Title level={3}>6. Thay đổi chính sách</Title>
                    <Paragraph>
                        Chúng tôi có quyền cập nhật hoặc thay đổi chính sách này bất cứ lúc nào. Mọi thay đổi sẽ được thông báo trên trang này.
                    </Paragraph>
                </div>
            </Content>
        </Layout>
    );
};

export default PrivacyPolicy;