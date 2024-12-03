import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/BlogModel";

export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the blog by ID and delete it
        const deletedBlog = await BlogModel.findByIdAndDelete(id);

        // Check if the blog was found and deleted
        if (!deletedBlog) {
            return Response.json(
                {
                    message: "Blog not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Blog Deleted Successfully",
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                message: "Have an error",
                success: false
            },
            { status: 500 }
        );
    }
}
