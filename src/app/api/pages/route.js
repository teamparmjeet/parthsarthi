import dbConnect from "@/lib/dbConnect";
import PageModel from "@/model/PagesModel";



export async function POST(req) {
    await dbConnect();

    try {
        const { title, slug, content, image, seoTitle, seoDescription } = await req.json();
        
        const createPage = await PageModel.create({
            title, slug, content, image, seoTitle, seoDescription
        })

        return Response.json(
            {
                message: "Page Created Successfully!",
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
                message: "Page Not Created!",
                success: false
            },
            {
                status: 500
            }
        )
    }





}


// delete page 

export async function DELETE(req) {

    await dbConnect();

    try {
        const searchParams = req.nextUrl.searchParams;
        const id = await searchParams.get('_id');

        if (!id) {
            return Response.json({
                message: "ID Required to Delete Page!",
                success: false
            }, {
                status: 400
            })
        }

        const deletePage = await PageModel.findOneAndDelete(id);

        if (!deletePage) {
            return Response.json({
                message: "Page Not Found to Delete!",
                success: false
            }, {
                status: 404
            })
        }

        return Response.json({
            message: "Page Deleted Successfully!",
            success: true
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Have An Error to Delete Page",
            success: false
        }, {
            status: 500
        })
    }

}


// get all pages 

export async function GET() {

    await dbConnect();

    try {
        const data = await PageModel.find({ defaultValue: "page" });

        return Response.json(
            {
                message: "All Pages Fetched",
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
                message: "Have an Error to Fetch Pages",
                success: false,
            },
            {
                status: 500
            }
        )
    }


}