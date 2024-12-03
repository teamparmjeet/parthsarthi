import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/CantactModel";


export async function DELETE(req) {
    await dbConnect();

    try {
        // Connect to the database


        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');


        // Find the Contact by ID and delete it
        const deletedContact = await ContactModel.findByIdAndDelete(id);

        // Check if the Contact was found and deleted
        if (!deletedContact) {
            return Response.json(
                {
                    message: "Contact not found!",
                    success: false
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Contact Deleted Successfully",
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
