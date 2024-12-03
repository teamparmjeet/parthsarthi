import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/model/ReviewsModel";

export async function POST(req) {
    await dbConnect();

    try {

        const { name, location, star, review } = await req.json();

        const createReview = await ReviewModel.create({ name, location, star, review })
      
        return Response.json(
            {
                message: "Review Added Successfully!",
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
                message: "Review Added Failed!",
                success: false
            }, {
            status: 400
        }
        )
    }


}
