import React from 'react';
import { Layout, Typography, Collapse, Space } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Content } = Layout;

const FAQ = () => {
    return (
        <Layout style={{ padding: '20px' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2}>Câu hỏi thường gặp (FAQ)</Title>

                <Paragraph>
                    Dưới đây là một số câu hỏi thường gặp từ người dùng của chúng tôi về việc đăng bài và sử dụng dịch vụ blog. Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, vui lòng liên hệ với chúng tôi.
                </Paragraph>

                <Collapse defaultActiveKey={['1']}>
                    <Panel header="1. Tôi có thể đăng bài viết trên blog không?" key="1">
                        <Paragraph>
                            Có, bạn có thể đăng bài viết trên blog của chúng tôi. Tuy nhiên, tất cả các bài viết sẽ được kiểm duyệt trước khi công khai.
                        </Paragraph>
                    </Panel>

                    <Panel header="2. Làm thế nào để tôi đăng ký tài khoản?" key="2">
                        <Paragraph>
                            Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút "Đăng ký" trên trang chính. Sau đó, điền thông tin cần thiết và xác nhận email của bạn.
                        </Paragraph>
                    </Panel>

                    <Panel header="3. Thời gian kiểm duyệt bài viết là bao lâu?" key="3">
                        <Paragraph>
                            Thời gian kiểm duyệt thường mất từ 24 đến 48 giờ. Chúng tôi sẽ thông báo cho bạn qua email khi bài viết của bạn được duyệt hoặc cần sửa đổi.
                        </Paragraph>
                    </Panel>

                    <Panel header="4. Tôi có thể chỉnh sửa bài viết của mình sau khi đăng không?" key="4">
                        <Paragraph>
                            Có, bạn có thể chỉnh sửa bài viết của mình bất cứ lúc nào trước và sau khi bài viết được công bố. Hãy truy cập vào trang quản lý bài viết của bạn để thực hiện chỉnh sửa.
                        </Paragraph>
                    </Panel>

                    <Panel header="5. Bài viết của tôi có thể được xóa không?" key="5">
                        <Paragraph>
                            Có, bạn có thể yêu cầu xóa bài viết của mình bất cứ lúc nào. Vui lòng liên hệ với chúng tôi qua email để yêu cầu xóa.
                        </Paragraph>
                    </Panel>

                    <Panel header="6. Có phí nào khi đăng bài không?" key="6">
                        <Paragraph>
                            Không, việc đăng bài trên blog của chúng tôi là miễn phí.
                        </Paragraph>
                    </Panel>

                    <Panel header="7. Tôi có thể chia sẻ bài viết của người khác không?" key="7">
                        <Paragraph>
                            Có, bạn có thể chia sẻ bài viết của người khác trên các nền tảng mạng xã hội hoặc qua email, miễn là bạn ghi rõ nguồn gốc.
                        </Paragraph>
                    </Panel>

                    <Panel header="8. Tôi có thể đăng bài viết quảng cáo không?" key="8">
                        <Paragraph>
                            Các bài viết quảng cáo sẽ không được chấp nhận trừ khi được phê duyệt bởi đội ngũ quản trị. Vui lòng liên hệ với chúng tôi để biết thêm thông tin.
                        </Paragraph>
                    </Panel>

                    <Panel header="9. Làm thế nào để tôi liên hệ với bộ phận hỗ trợ?" key="9">
                        <Paragraph>
                            Bạn có thể liên hệ với bộ phận hỗ trợ qua email tại hhyu03096@gmail.com hoặc thông qua mẫu liên hệ trên trang web.
                        </Paragraph>
                    </Panel>

                    <Panel header="10. Tôi có thể theo dõi bài viết của mình như thế nào?" key="10">
                        <Paragraph>
                            Bạn có thể theo dõi trạng thái bài viết của mình trong phần quản lý bài viết trên tài khoản của bạn. Tại đó, bạn sẽ thấy các thông báo về trạng thái kiểm duyệt.
                        </Paragraph>
                    </Panel>
                </Collapse>

                <Space style={{ marginTop: '20px' }}>
                    <Paragraph>
                        Nếu bạn có bất kỳ câu hỏi nào khác, đừng ngần ngại liên hệ với chúng tôi!
                    </Paragraph>
                </Space>
            </Content>
        </Layout>
    );
};

export default FAQ;