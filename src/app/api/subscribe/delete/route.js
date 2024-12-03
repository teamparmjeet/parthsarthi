import dbConnect from "@/lib/dbConnect";
import SubscribeModel from "@/model/subscribeModel";


export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the Subscribe by ID and delete it
        const deletedSubscribe = await SubscribeModel.findByIdAndDelete(id);

        // Check if the Subscribe was found and deleted
        if (!deletedSubscribe) {
            return Response.json(
                {
                    message: "Subscribe not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Subscribe Deleted Successfully",
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
