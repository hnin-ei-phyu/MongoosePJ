import User from "../models/user"

class UserController{
    async get (req: any, res: any){
        const userId: string = req.params.id
        try {
            let user = await User.findOne({_id: userId})
            if(!user) {
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async create (req: any, res: any) {
        const userDoc = req.body
        try {
            let user = new User(userDoc)
            user.save(function(err){
            if(err){
                 console.log(err);
                 return;
            }
            res.status(200).json(user)
            });
        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
      
    }

    async update (req: any, res: any) {
        const userId: string = req.params.id
        const updateData: Object = req.body 
        try {
            let user = await User.findById(userId).lean()
            if(!user){
                res.status(404).json({msg: "User not found!"})
            }
            await User.findByIdAndUpdate(userId,updateData)
            res.status(200).json({msg: "Updated Successfully !"})
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async getAll (req: any, res: any) {
        try {
            let data = await User.find()
            if(!data) {
                res.status(404).json({msg: "Data not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async delete (req: any, res: any) {
        const userId: String = req.params.id
        try {
            let data = await User.deleteOne({_id: userId})
            if(!data) {
                res.status(404).json({msg: "Data not found !"})
            }
            res.status(200).json({msg: "Deleted successfully !"})
        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }
}

export default UserController