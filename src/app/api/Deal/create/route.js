import dbConnect from "@/lib/dbConnect";
import DealModel from "@/model/Deal";

export async function POST(req) {

    await dbConnect();

    try {

        const { Deal } = await req.json();

        const DealCreate = await DealModel.create(
            { Deal }
        )

        return Response.json(
            {
                message: "Deal Created Successfully!",
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
                message: "Deal Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}