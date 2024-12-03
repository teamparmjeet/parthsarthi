import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function GET(){
    await dbConnect();

    try {
        const data = await ProjectModel.find({ defaultValue: "project" });

        return Response.json(
            {
                message: "All Data Fetched successfully!",
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
                message: "Data Have an Error to Fetched!",
                success: false
            },
            {
                status: 400
            }
        )
    }
}