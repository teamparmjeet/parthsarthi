import dbConnect from "@/lib/dbConnect";
import DealModel from "@/model/Deal";

export async function GET() {
    await dbConnect();

    try {

        const data = await DealModel.find({ defaultdata: "Deal" });

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