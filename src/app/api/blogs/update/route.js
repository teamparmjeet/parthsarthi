import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/BlogModel";

export async function PATCH(req) {
    await dbConnect();

    try {

        const data = await req.json();

        const blog = await BlogModel.findById(data.id);

        if (!blog) {
            return Response.json(
                {
                    message: "Blog Not Found!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        const updateBlog = await BlogModel.updateOne(
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