import ReviewModel from "@/model/ReviewsModel";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(req) {

    await dbConnect();

    try {
        const data = await req.json();

        const review = await ReviewModel.findOne({ _id: data.id });

        if (!review) {
            return Response.json(
                {
                    message: "Find Unvaild ID",
                    success: false
                }, {
                status: 404
            }
            )
        }

        await ReviewModel.updateOne(
            { _id: data.id },
            { $set: data }
        )

        return Response.json(
            {
                message: "Review Updated Successfully!",
                success: true
            }, {
            status: 200
        }
        )

    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Faild in Updaate Review",
            success: true
        }, {
            status: 400
        })
    }



}