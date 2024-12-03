import dbConnect from "@/lib/dbConnect";
import ProjectCategoryModel from "@/model/ProjectCategoryModel";

export async function DELETE(req, context) {
    await dbConnect();

    try {
        const { id } = context.params; // Get the ID from the route parameters
        const deletedData = await ProjectCategoryModel.findByIdAndDelete(id);

        if (!deletedData) {
            return Response.json(
                {
                    message: "Category Not Found!",
                    success: false
                },
                {
                    status: 404
                }
            );
        }

        return Response.json(
            {
                message: "Category Deleted Successfully!",
                success: true,
                data: deletedData
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Category!",
                success: false,
                error: error.message || "An unexpected error occurred"
            },
            {
                status: 500
            }
        );
    }
}
