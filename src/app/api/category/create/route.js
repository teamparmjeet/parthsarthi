import dbConnect from "@/lib/dbConnect";
import ProjectCategoryModel from "@/model/ProjectCategoryModel";

export async function POST(req) {

    await dbConnect();

    try {

        const { title, slug, image, seoTitle, seoDescription } = await req.json();

        const CategoryCreate = await ProjectCategoryModel.create(
            { title, slug, image, seoTitle, seoDescription }
        )

        return Response.json(
            {
                message: "Category Created Successfully!",
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
                message: "Category Not Created! title and slug must be unique",
                success: false
            },
            {
                status: 400
            }
        )
    }

}