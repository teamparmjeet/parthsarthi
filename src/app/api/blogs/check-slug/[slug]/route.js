import BlogModel from "@/model/BlogModel";

// API Route to check for existing slug
export async function GET(req, context) {

    const slug = await context.params.slug;


    try {
        // Assuming you have a method to find a page by slug
        const blog = await BlogModel.findOne({ slug });

        if (blog) {
            return Response.json({ success: true }, { status: 200 })
        } else {
            return Response.json({ success: false }, { status: 200 })

        }
    } catch (err) {
        return Response.json({ error: "Error checking slug" }, { status: 500 })

    }
}
