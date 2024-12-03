import dbConnect from "@/lib/dbConnect";
import ProjectCategoryModel from "@/model/ProjectCategoryModel";

export async function GET(req, context) {
    await dbConnect();

    try {
        const id = context.params.id;
        const data = await ProjectCategoryModel.findById(id);

        if (!data) {
            return Response.json(
                {
                    message: "Data Not Founded!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        return Response.json(
            {
                message: "Data Founded!",
                success: true,
                data
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Data not Found!",
                success: false
            },
            {
                status: 500
            }
        )
    }
}
