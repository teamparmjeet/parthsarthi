import dbConnect from "@/lib/dbConnect";
import BannerModel from "@/model/Banner";

export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the Banner by ID and delete it
        const deletedBanner = await BannerModel.findByIdAndDelete(id);

        // Check if the Banner was found and deleted
        if (!deletedBanner) {
            return Response.json(
                {
                    message: "Banner not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Banner Deleted Successfully",
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                message: "Have an error",
                success: false
            },
            { status: 500 }
        );
    }
}
