import ReviewModel from "@/model/ReviewsModel";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    await dbConnect();

    try {
        const data = await ReviewModel.find({ defaultdata: "review" });
        return Response.json(
            {
                message: "All data fetched!",
                success: true,
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error on getting data list:", error);
        return Response.json(
            {
                message: "Error on getting data list!",
                success: false,
            },
            { status: 500 }
        );
    }
}