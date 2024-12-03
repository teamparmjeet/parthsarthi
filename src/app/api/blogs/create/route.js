import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/BlogModel";

export async function POST(req) {

    await dbConnect();

    try {

        const { title, slug, content, author, image } = await req.json();

        const blogCreate = await BlogModel.create(
            { title, slug, content, author, image }
        )

        return Response.json(
            {
                message: "Blog Created Successfully!",
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
                message: "Blog Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}