import ProjectCategoryModel from "@/model/ProjectCategoryModel";

// API Route to check for existing slug
export async function GET(req, context) {

    const slug = await context.params.slug;


    try {
        // Assuming you have a method to find a page by slug
        const Category = await ProjectCategoryModel.findOne({ slug });

        if (Category) {
            return Response.json({ success: true }, { status: 200 })
        } else {
            return Response.json({ success: false }, { status: 200 })

        }
    } catch (err) {
        return Response.json({ error: "Error checking slug" }, { status: 500 })

    }
}
