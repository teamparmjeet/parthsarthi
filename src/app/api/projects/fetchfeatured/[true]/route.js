import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function GET() {
    await dbConnect();

    try {
        const data = await ProjectModel.find({ isFeatured: true, defaultValue: "project" })
            .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
            .limit(3); // Limit the result to the latest 3

        return Response.json(
            {
                message: "Latest 3 featured projects fetched!",
                success: true,
                data
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "An error occurred while fetching data",
                success: false
            },
            {
                status: 400
            }
        );
    }
}
