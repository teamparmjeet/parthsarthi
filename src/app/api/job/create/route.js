import dbConnect from "@/lib/dbConnect";
import JobModel from "@/model/Job";

export async function POST(req) {

    await dbConnect();

    try {

        const { fullName, email, phone, address, jobprofile } = await req.json();

        const JobRequest = await JobModel.create(
            { fullName, email, phone, address, jobprofile }
        )

        return Response.json(
            {
                message: "Job Request Successfully!",
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
                message: "Job Request Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}