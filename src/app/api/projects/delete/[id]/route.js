import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function DELETE(req, context){
      await dbConnect();

      try {
        const id = context.params.id;
        
        const deleteProject = await ProjectModel.findByIdAndDelete(id);

        if(!deleteProject){
            return Response.json(
                {
                    message: "Id Not Found",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        return Response.json(
            {
                message: "Id Found and Delted Successfully!",
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
                message: "Have an error to delete Project!",
                success: false
            },
            {
                status: 500
            }
        )
      }
}