import "./Viewer.css";

const Viewer = ( {postTitle, postContent}) => {
    return (
        <div className="Viewer">
            <section className="post_section">
                <h4>토론 주제</h4>
                    <div className="title_wrapper">
                        <p>{postTitle}</p>
                    </div>
    
                <h4>토론 내용</h4>
                    <div className="content_wrapper">
                        <p>{postContent}</p>
                    </div>
            </section>
        </div>
    );
}

export default Viewer;