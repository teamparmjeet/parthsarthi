import dbConnect from "@/lib/dbConnect";
import DealModel from "@/model/Deal";

export async function PATCH(req) {
    await dbConnect();

    try {

        const data = await req.json();

        const Deal = await DealModel.findById(data.id);

        if (!Deal) {
            return Response.json(
                {
                    message: "Deal Not Found!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        const updateDeal = await DealModel.updateOne(
            {
                _id: data.id
            },
            {

                $set: data
            }
        )

        return Response.json(
            {
                message: "Updated Successfully",
                success: true
            },
            {
                status: 200
            }
        )



    } catch (error) {
        console.log(error)
        return Response.json(
            {
                message: "Have an error",
                success: false
            },
            {
                status: 500
            }
        )
    }


}