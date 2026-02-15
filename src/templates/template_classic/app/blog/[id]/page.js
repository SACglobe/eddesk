import BlogPostViewScreen from "../../../screens/BlogPostViewScreen";

export default async function BlogPost({ params }) {
    const { id } = await params;
    return <BlogPostViewScreen id={id} />;
}
