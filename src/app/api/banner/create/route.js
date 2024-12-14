import dbConnect from "@/lib/dbConnect";
import BannerModel from "@/model/Banner";


export async function POST(req) {
    await dbConnect();
    try {
        const { imgurl } = await req.json();
        const BannerCreate = await BannerModel.create(
            { imgurl }
        )
        return Response.json(
            {
                message: "Banner Created Successfully!",
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
                message: "Banner Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}