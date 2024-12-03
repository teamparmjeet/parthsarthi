import ProjectModel from "@/model/ProjectModel";

// API Route to check for existing slug
export async function GET(req, context) {

    const slug = await context.params.slug;


    try {
        // Assuming you have a method to find a page by slug
        const Project = await ProjectModel.findOne({ slug });

        if (Project) {
            return Response.json({ success: true }, { status: 200 })
        } else {
            return Response.json({ success: false }, { status: 200 })

        }
    } catch (err) {
        return Response.json({ error: "Error checking slug" }, { status: 500 })

    }
}
