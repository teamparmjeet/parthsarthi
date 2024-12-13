import dbConnect from "@/lib/dbConnect";
import LeadModel from "@/model/LeadContact";


export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the Lead by ID and delete it
        const deletedLead = await LeadModel.findByIdAndDelete(id);

        // Check if the Lead was found and deleted
        if (!deletedLead) {
            return Response.json(
                {
                    message: "Lead not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Lead Deleted Successfully",
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
