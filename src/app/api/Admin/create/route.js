import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/AdminModel";
import bcrypt from "bcryptjs/dist/bcrypt";

export async function POST(req) {

    await dbConnect();

    try {
        const { name, email, phone, password } = await req.json();
        const alreadyUser = await AdminModel.findOne({ email });
        console.log(alreadyUser);
        if (alreadyUser) {
            return Response.json({
                message: "User Already Registred with this mail id",
                success: false
            }, {
                status: 400
            }
            )
        }

        const hashed = await bcrypt.hash(password, 10);

        const CreateAdmin = await AdminModel.create({
            name, email, phone, password: hashed
        });

        return Response.json({
            message: "User Created Successfully!",
            success: true
        }, {
            status: 201
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "error in register admin",
            success: false
        }, { status: 500 })

    }

}