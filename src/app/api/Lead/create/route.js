import dbConnect from "@/lib/dbConnect";
import LeadModel from "@/model/LeadContact";

export async function POST(req) {

    await dbConnect();

    try {

        const { bhk, size, project, fullName, email, phone, address, terms } = await req.json();

        const LeadCreate = await LeadModel.create(
            { bhk, size, project, fullName, email, phone, address, terms }
        )

        return Response.json(
            {
                message: "Lead Created Successfully!",
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
                message: "Lead Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}