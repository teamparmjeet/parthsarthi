import dbConnect from "@/lib/dbConnect";
import ProjectCategoryModel from "@/model/ProjectCategoryModel";

export async function GET() {

    await dbConnect();

    try {

        const data = await ProjectCategoryModel.find({ defaultValue: "category" });

        if (!data) {
            return Response.json(
                {
                    message: "Data Not Found in Category!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        return Response.json(
            {
                message: "Data All Geted successfully!",
                success: true,
                data
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: "Have an error to Fetch Data",
                success: false
            },
            {
                status: 500
            }
        )

    }
}

export async function POST(req) {
    await dbConnect();
    try {

        const { title, slug, image, seoTitle, seoDescription } = await req.json();

        const addCategory = await ProjectCategoryModel.create(
            { title, slug, image, seoTitle, seoDescription }
        );

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
                message: "Category Not Created!",
                success: false
            },
            {
                status: 500
            }
        )
    }
}