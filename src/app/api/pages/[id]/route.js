import PageModel from "@/model/PagesModel";
import dbConnect from "@/lib/dbConnect";

export async function GET(req, context) {
    await dbConnect();

    try {
        const id = context.params.id;

        const data = await PageModel.findById(id);

        if (!data) {
            return Response.json({
                message: "Page Not Found",
                success: false
            }, {
                status: 404
            })
        }

        return Response.json({
            message: "Success",
            success: true,
            data
        }, {
            status: 200
        })


    } catch (error) {
        return Response.json({
            message: "An Error Occure in Finding Data",
            success: false
        }, {
            status: 500
        })
    }


}