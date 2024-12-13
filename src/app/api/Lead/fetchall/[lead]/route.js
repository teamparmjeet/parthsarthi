import dbConnect from "@/lib/dbConnect";
import LeadModel from "@/model/LeadContact";

export async function GET() {
    await dbConnect();

    try {

        const data = await LeadModel.find({ defaultValue: "lead" });

        return Response.json(
            {
                message: "All Data Fetched!",
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
                message: "Have an error to fetch data",
                success: false
            },
            {
                status: 400
            }
        )
    }
}