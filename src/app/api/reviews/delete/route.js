import ReviewModel from "@/model/ReviewsModel";
import dbConnect from "@/lib/dbConnect";
export async function DELETE(req) {

    await dbConnect();


    try {
        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');

        if (!id) {
            return Response.json({
                message: "Review ID is required",
                success: false
            }, {
                status: 400
            });
        }

        const deleteReview = await ReviewModel.findByIdAndDelete(id);

        if (!deleteReview) {
            return Response.json({
                message: "Review not found",
                success: false
            }, {
                status: 404
            });
        }


        return Response.json(
            {
                message: "Review Deleted Successfully!",
                success: true
            }, {
            status: 200
        }
        )


    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Failed to delete review",
            success: false
        }, {
            status: 500
        });
    }
}