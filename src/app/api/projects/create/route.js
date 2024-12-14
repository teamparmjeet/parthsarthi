import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function POST(req) {

    await dbConnect();

    try {
        const { category, price, title, slug, content, location, projectSize, bhk, isFeatured, propertyType, possessionStatus, AvailablePlot, map,logo, image, gallery, sitePlan, pdf, seoTitle, seoDescription } = await req.json();


        const dataUp = await ProjectModel.create({ category, price, title, slug, content, location, projectSize, bhk, isFeatured, propertyType, possessionStatus, AvailablePlot, map,logo, image, gallery, sitePlan, pdf, seoTitle, seoDescription });



        return Response.json(
            {
                message: "Project Created Successfully!",
                success: true
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return Response.json(
            {
                message: error,
                success: false
            },
            {
                status: 400
            }
        )
    }



}