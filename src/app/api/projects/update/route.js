import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function PATCH(req) {

    await dbConnect();

    try {
        const data = await req.json();

        const project = await ProjectModel.findById(data.id);
        if (!project) {
            return Response.json(
                {
                    message: "Project Not Found From this ID!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        const updateProject = await ProjectModel.updateOne(
            {
                _id: data.id
            },
            {

                $set: data
            }
        )

        return Response.json(
            {
                message: "Project Updated Successfully!",
                success: true
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Project Not Updated!",
                success: false
            },
            {
                status: 500
            }
        )
    }


}