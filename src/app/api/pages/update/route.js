import dbConnect from "@/lib/dbConnect";
import PageModel from "@/model/PagesModel";

export async function PATCH(req) {

    await dbConnect();

    try {

        const data = await req.json();

        const page = await PageModel.findById(data.id);

        if (!page) {
            return Response.json(
                {
                    message: "Page Not Found!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        await PageModel.updateOne(
            { _id: data.id },
            { $set: data }
        )

        return Response.json(
            {
                message: "Page Updated!",
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
                message: "Have an Error",
                success: false
            },
            {
                status: 400
            }
        )
    }
}