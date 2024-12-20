import dbConnect from "@/lib/dbConnect";
import JobModel from "@/model/Job";


export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the Job by ID and delete it
        const deletedJob = await JobModel.findByIdAndDelete(id);

        // Check if the Job was found and deleted
        if (!deletedJob) {
            return Response.json(
                {
                    message: "Job not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Job Deleted Successfully",
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
