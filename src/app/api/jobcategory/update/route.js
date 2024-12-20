import dbConnect from "@/lib/dbConnect";
import JobcategoryModel from "@/model/JobCategory";

export async function PATCH(req) {
    await dbConnect();

    try {
        const { id, ...updateData } = await req.json();

        const categoryData = await JobcategoryModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        if (!categoryData) {
            return Response.json(
                {
                    message: "Category Not Found to Update!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Category Updated Successfully!",
                success: true,
                data: categoryData
            },
            { status: 200 }
        );
    } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (error.name === "ValidationError") {
            errorMessage = Object.values(error.errors).map((err) => err.message).join(", ");
        } else if (error.code === 11000) {
            errorMessage = `Duplicate value for: ${Object.keys(error.keyValue).join(", ")}.`;
        }

        return Response.json(
            {
                message: "Category Update Failed!",
                error: errorMessage,
                success: false
            },
            { status: 400 }
        );
    }
}
