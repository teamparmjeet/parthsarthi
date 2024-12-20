import dbConnect from "@/lib/dbConnect";
import JobcategoryModel from "@/model/JobCategory";

export async function POST(req) {

    await dbConnect();

    try {

        const { category } = await req.json();

        const CategoryCreate = await JobcategoryModel.create(
            { category }
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