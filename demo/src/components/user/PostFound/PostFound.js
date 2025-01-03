import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, getPostsBySearch } from '../../../api/api'; // Thêm hàm tìm kiếm
import Loading from '../Loading/Loading';
import './ArticleList.css'; // Cập nhật tên file CSS
import Search from '../Search/Search';

const ArticleList = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);

            try {
                const response = await getAllPosts();
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [navigate]);

    const handleSetArticles = (newArticles) => {
        setArticles(newArticles);
    };

    const handleSearch = async (searchTerm) => {
        if (!searchTerm) {
            const response = await getAllPosts();
            setArticles(response.data);
            return;
        }

        try {
            const response = await getPostsBySearch(searchTerm); // Gọi API tìm kiếm
            setArticles(response.data); // Cập nhật danh sách bài viết với kết quả tìm kiếm
        } catch (error) {
            console.error("Error searching posts:", error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="article-list-container">
                <div className="article-layout">
                    <div className="article-item article-item-large" key={articles[0]?._id}>
                        <img src='/hinhnen.jpg' alt="Article Thumbnail" className="article-image-large" />
                        <a href={`/posts/${articles[0]?._id}`} className="article-title">{articles[0]?.title}</a>
                        <p className="article-content">{articles[0]?.content.length > 50 ? `${articles[0].content.substring(0, 90)}...` : articles[0].content}</p>
                        <p className="article-category">
                            <strong>Chủ đề:</strong> {articles[0]?.category_id ? articles[0].category_id.name : 'N/A'}
                        </p>
                        <p className="article-author">
                            <strong>Tác giả:</strong> {articles[0]?.user_id ? articles[0].user_id.username : 'Unknown'}
                        </p>
                        <p className="article-tags">
                            <strong>Thể loại:</strong> {articles[0]?.tags.length > 0 ? articles[0].tags.map(tag => tag.name).join(', ') : 'None'}
                        </p>
                        <p className="article-likes">
                            <strong>Số lượt thích:</strong> {articles[0]?.likes}
                        </p>
                    </div>
                    <div className="small-articles-container">
                        {articles.slice(1, 3).map(article => (
                            <div className="article-item article-item-small" key={article._id}>
                                <img src='/hinhnen.jpg' alt="Article Thumbnail" className="article-image-small" />
                                <div className="article-content-container">
                                    <a href={`/posts/${article._id}`} className="article-title">{article.title}</a>
                                    <p className="article-content">{article.content.length > 50 ? `${article.content.substring(0, 23)}...` : article.content}</p>
                                    <p className="article-category">
                                        <strong>Chủ đề:</strong> {article.category_id ? article.category_id.name : 'N/A'}
                                    </p>
                                    <p className="article-author">
                                        <strong>Tác giả:</strong> {article.user_id ? article.user_id.username : 'Unknown'}
                                    </p>
                                    <p className="article-tags">
                                        <strong>Thể loại:</strong> {article.tags.length > 0 ? article.tags.map(tag => tag.name).join(', ') : 'None'}
                                    </p>
                                    <p className="article-likes">
                                        <strong>Số lượt thích:</strong> {article.likes}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticleList;