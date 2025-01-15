// src/components/TermsOfService.js

import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const TermsOfService = () => {
    return (
        <Layout style={{ padding: '20px' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2}>Điều khoản dịch vụ</Title>
                
                <Paragraph>
                    Xin chào mừng bạn đến với trang web của chúng tôi. Việc sử dụng trang web này đồng nghĩa với việc bạn đồng ý với các điều khoản dịch vụ dưới đây.
                </Paragraph>

                <Divider />

                <Title level={3}>1. Giới thiệu</Title>
                <Paragraph>
                    Trang web của chúng tôi cung cấp thông tin bằng các bài viết .... 
                </Paragraph>

                <Divider />

                <Title level={3}>2. Sử dụng dịch vụ</Title>
                <Paragraph>
                    Bạn đồng ý sử dụng dịch vụ của chúng tôi một cách hợp pháp và không vi phạm bất kỳ pháp luật nào.
                </Paragraph>

                <Divider />

                <Title level={3}>3. Quyền sở hữu trí tuệ</Title>
                <Paragraph>
                    Tất cả nội dung trên trang web này, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, logo và phần mềm, đều thuộc quyền sở hữu trí tuệ của chúng tôi.
                </Paragraph>

                <Divider />

                <Title level={3}>4. Liên kết tới các trang web khác</Title>
                <Paragraph>
                    Trang web của chúng tôi có thể chứa liên kết đến các trang web bên ngoài. Chúng tôi không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của các trang web này.
                </Paragraph>

                <Divider />

                <Title level={3}>5. Thay đổi điều khoản</Title>
                <Paragraph>
                    Chúng tôi có quyền thay đổi các điều khoản dịch vụ này bất kỳ lúc nào mà không cần thông báo trước. Bạn nên kiểm tra thường xuyên để cập nhật các điều khoản mới nhất.
                </Paragraph>

                <Divider />

                <Title level={3}>6. Liên hệ</Title>
                <Paragraph>
                    Nếu bạn có bất kỳ câu hỏi nào về các điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi qua địa chỉ email: [email@example.com].
                </Paragraph>

                <Divider />

                <Paragraph>
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
                </Paragraph>
            </Content>
        </Layout>
    );
};

export default TermsOfService;