import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/model/CantactModel";

export async function POST(req) {

    await dbConnect();

    try {

        const { fullName, email, phone, address, terms } = await req.json();

        const ContactCreate = await ContactModel.create(
            { fullName, email, phone, address, terms }
        )

        return Response.json(
            {
                message: "Contact Created Successfully!",
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
                message: "Contact Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}